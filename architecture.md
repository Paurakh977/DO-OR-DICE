
***

#  DO or DICE - Architecture

## 1. Project Overview
**DO or DICE** is a strategy dice game for 5 players. The system is designed with a **Decoupled Architecture**, separating the core game logic (Business Layer) from the User Interface (Presentation Layer). This allows the game to run on a CLI (Terminal) initially and easily plug into a Pygame UI later without changing the core rules.

---

## 2. High-Level Design Pattern
We follow a variation of the **MVC (Model-View-Controller)** and **Service-Layer** patterns:

*   **Models:** Data structures representing the state (Player, GameState).
*   **Services:** Pure business logic (Dice rolling, Damage calculation, Ranking).
*   **Controllers:** Orchestrators that handle user input and coordinate services.
*   **Utils/Helpers:** Validation and static logic.

---

## 3. Directory Structure & Responsibilities

Based on the existing project structure, here is where the logic resides:

```text
src/
├── controllers/      # (The Brain) Orchestrates the game flow.
├── models/           # (The Data) Classes defining Players, Game State.
├── services/         # (The Logic) Dice rolling, Turn resolution, Ranking.
├── utils/            # (The Rules) Validators, Constants, Enums.
├── database/         # (Storage) Saving game history/leaderboards.
└── helpers/          # General utility functions.
```

---

## 4. Core Class Design

### A. Models (`src/models`)

#### 1. `Player`
Represents a single entity in the game.
*   **Attributes:** `id`, `name`, `avatar`, `hp` (Max 20), `vp` (Start 0), `is_alive`, `fallen_rounds_count`, `last_targeted_id`.
*   **Methods:** `take_damage()`, `heal()`, `add_vp()`, `steal_vp()`.

#### 2. `GameState`
Snapshot of the current game.
*   **Attributes:** `current_round`, `turn_index`, `players_list`, `game_over`, `logs`.

### B. Services (`src/services`)

#### 1. `DiceService`
Handles randomness and mapping.
*   **Methods:**
    *   `roll()`: Returns integer 1-6.
    *   `map_alive_roll(value)`: Returns Enum (JAB, STRIKE, BACKFIRE, etc.).
    *   `map_fallen_roll(value)`: Returns Enum (BUFF_ALLY, DEBUFF_ENEMY).

#### 2. `TurnResolverService`
The engine that executes actions.
*   **Responsibilities:**
    *   Receives an `Action` (Source Player, Target Player, Action Type).
    *   Calculates HP/VP changes.
    *   Updates the `Player` model.
    *   **Crucial:** Calls `HistoryService` to log what happened.

#### 3. `RankingService`
Calculates leaderboard dynamically.
*   **Logic:**
    1.  Highest VP.
    2.  If tie: Higher HP (at current moment or elimination).
    3.  If tie: Fewer rounds as Fallen.
    4.  If tie: Random Roll.

#### 4. `HistoryService`
Tracks the timeline.
*   **Data:** Stores a list of events: `[Round 1, Player A struck Player B (-4HP)]`.

### C. Utils / Validators (`src/utils`)

#### 1. `ActionValidator`
Ensures game integrity before the `TurnResolver` runs.
*   **Checks:**
    *   Is the current player allowed to act?
    *   Is the target valid? (e.g., Cannot target self for an attack).
    *   *Fallen Rule:* Did the Fallen player target this same person last round?

### D. Controller (`src/controllers`)

#### 1. `GameController`
The entry point for the UI (Pygame or Terminal).
*   **Flow:**
    1.  `init_game()`: Setup 5 players.
    2.  `play_turn()`: Calls DiceService -> Gets User Input -> Calls Validator -> Calls TurnResolver.
    3.  `end_round()`: Applies Survival Bonus (+1 VP to alive), checks Win Condition.
    4.  `get_state()`: Returns data for UI rendering.

---

## 5. Game Logic Data Flow

### Step-by-Step Execution Sequence

1.  **Start Turn:** UI requests `GameController` to roll for `CurrentPlayer`.
2.  **Dice Roll:** `DiceService` generates number (e.g., **4**).
3.  **Mapping:**
    *   If Alive: 4 -> **STRIKE** (-4 HP).
    *   If Fallen: 4 -> **BUFF** (+2 HP / +1 VP).
4.  **UI Feedback:** UI shows "Strike! Choose Target".
5.  **User Input:** Player selects `TargetPlayer`.
6.  **Validation:** `ActionValidator` checks if `TargetPlayer` is valid.
    *   *Fail:* Return error to UI.
    *   *Pass:* Proceed.
7.  **Resolution:** `TurnResolver` executes:
    *   `TargetPlayer.hp -= 4`.
    *   Checks if `TargetPlayer.hp <= 0` (Elimination logic).
    *   Awards VP if applicable.
8.  **Update:**
    *   `RankingService` updates positions.
    *   `HistoryService` logs the event.
9.  **Next Turn:** Controller advances index to next player.

---

## 6. Logic Tables (Implementation Guide)

### Alive Player Mapping
| Roll | Type | Effect |
| :--- | :--- | :--- |
| **1** | Backfire | Self -3 HP |
| **2** | Jab | Target -2 HP |
| **3** | Pickpocket | Steal 1 VP (Transfer) |
| **4** | Strike | Target -4 HP |
| **5** | Recover | Self +3 HP |
| **6** | Power Move | Choice: Target -6 HP **OR** Self +3 VP |

### Fallen Player Mapping
| Roll | Type | Effect |
| :--- | :--- | :--- |
| **1-2** | Void | No Effect |
| **3-4** | Haunt (Good) | Give Alive Player: +2 HP **OR** +1 VP |
| **5-6** | Haunt (Bad) | Deal to Alive Player: -2 HP **OR** -1 VP |
*Constraint: Cannot target the same player twice in consecutive rounds.*

---

## 7. UI Integration Strategy (Pygame)

The **GameController** acts as an API. The Pygame loop will look like this:

```python
# Pseudo-code for UI Integration
while game_running:
    # 1. Fetch Data
    state = game_controller.get_state_for_ui()
    
    # 2. Render
    draw_players(state.players)
    draw_dice(state.last_roll)
    
    # 3. Handle Events
    for event in pygame.event.get():
        if event.type == CLICK_DICE:
            result = game_controller.roll_dice()
            show_animation(result)
            
        if event.type == CLICK_PLAYER_TARGET:
            try:
                game_controller.execute_action(target_id)
            except ValidationError as e:
                show_error_popup(e)
```

---

## 8. Database Schema (Future Proofing)

For `src/database`:
*   **Table: GameSessions** (id, date, winner_id, total_rounds)
*   **Table: PlayerStats** (player_name, games_played, wins, total_vp_earned)

---

## 9. Error Handling & Edge Cases

1.  **Sudden Death:** If only 1 player is alive before Round 6 ends, game stops immediately.
2.  **Overkill:** If a player has 2 HP and takes 6 damage, they drop to -4 (HP is relevant for tie-breaking).
3.  **Invalid Input:** Trying to "Pickpocket" a player with 0 VP (Validator should allow the move but result is 0 gain, or block it depending on preference). *Decision: Allow move, gain 0.*