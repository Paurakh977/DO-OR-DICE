
***

#  DO or DICE

**A strategic turn-based dice game where survival is just the beginning.**

> **Current Version:** 0.1.0  
> **Built with:** Python 3.13+, Pygame CE, Pydantic

---

##  Installation & Setup

This project uses **[uv](https://docs.astral.sh/uv/)**, an extremely fast Python package manager and resolver. Follow these steps to get the game running.

### 1. Install `uv`
If you do not have `uv` installed, install it via your terminal:

**Windows (PowerShell):**
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**macOS / Linux:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 2. Clone the Repository
Clone the project to your local machine:

```bash
git clone https://github.com/Paurakh977/DO-OR-DICE.git
cd DO-OR-DICE
```

### 3. Install Dependencies
Initialize the project and sync dependencies (this reads `pyproject.toml` and creates the virtual environment automatically):

```bash
uv sync
```

### 4. Run the Game
Launch the game using `uv run`:

```bash
uv run main.py
```

*(Note: You can also run tests using `uv run pytest`)*

---
## Project Structure
```
D:.
│   main.py               # Entry point. Initializes GameController and starts the loop.
│   architecture.md       # This documentation.
│   pyproject.toml        # Dependencies (uv).
│   ...
└───src
    ├───controllers       # (Orchestration)
    │   └── __init__.py   # Contains GameController. Handles flow, input, and state.
    │
    ├───models            # (Data Structure)
    │   └── __init__.py   # Classes: Player, GameState, DiceFace (Enum).
    │
    ├───services          # (Business Logic)
    │   └── __init__.py   # Classes: DiceService, TurnResolver, RankingService.
    │
    ├───utils             # (Validation & Rules)
    │   └── __init__.py   # Validators (e.g., TargetAliveValidator), Constants.
    │
    ├───database          # (Persistence)
    │   ├── config.py     # DB connection settings.
    │   └── __init__.py   # Log storage, Leaderboard persistence.
    │
    ├───helpers           # (Tools)
    │   └── __init__.py   # Formatting, CLI color helpers, UI converters.
    │
    └───tests             # (QA)
        └── __init__.py   # Unit tests for logic verification.

```
---

## 📖 Game Manual

### 👥 Players & Items Needed

*   **5 players only** (this is important for game balance)
*   **1 normal 6-sided dice**
*   **Pen & paper** (to track HP and points)

Each player starts with:
*   💚 **20 Health Points (HP)**
*   🏆 **0 Victory Points (VP)**

---

### 🎯 Goal of the Game

*   Try to **stay alive**.
*   Collect as many **Victory Points (VP)** as possible.

At the end of the game, we will announce:
🥇 **1st Place** | 🥈 **2nd Place** | 🥉 **3rd Place**

> **Note:** Even players who are eliminated can still make it into the Top 3 based on points earned before death!

---

### 🔄 How the Game Works (Round Flow)

The game is played in **rounds**. In each round:

1.  All **alive players** take turns rolling the dice.
2.  All **eliminated players** also roll (with special rules).
3.  Points and health are updated.

The game continues until:
*   Only **one player is alive**, OR
*   **6 rounds** are completed.

---

### 🎲 Dice Rules for Alive Players

When it is your turn, roll the dice and follow the result:

| Dice Face Name | Effect | Description |
| :--- | :--- | :--- |
| **Backfire** | **−3 HP** (Self) | You hurt yourself. |
| **Jab** | **−2 HP** (Target) | Choose any player → they lose HP. |
| **Pickpocket** | **+1 VP** (Steal) | Steal 1 VP from any player (they lose 1, you gain 1). |
| **Strike** | **−4 HP** (Target) | Choose any player → they lose HP. |
| **Recover** | **+3 HP** (Self) | You heal yourself. |
| **Power Move** | **Choice** | Choose: Deal **−6 HP** to a target **OR** Gain **+3 VP**. |

---

### ❤️ Survival Bonus

At the **end of each round**:
*   Every player who is **still alive** gains **+1 VP**.

*Staying alive always matters!*

---

### ☠️ What Happens When You Are Eliminated?

If your HP reaches **0 or below**:

❌ You are **not removed** from the game.  
Instead, you become a **Fallen Player**.

This means:
*   You cannot win the game (you cannot be 1st, but can still rank).
*   You do not have HP anymore.
*   **You still roll the dice every round.**

---

### 👻 Dice Rules for Fallen Players

Fallen Players roll once per round and apply the Shadow Effect:

| Dice Roll | Shadow Effect |
| :--- | :--- |
| **1 – 2** | **Nothing happens** |
| **3 – 4** | Give **+2 HP** OR **+1 VP** to any alive player |
| **5 – 6** | Remove **−2 HP** OR **−1 VP** from any alive player |

**Important Rule:** You **cannot affect the same player two rounds in a row**. This keeps the game fair.

---

### ⭐ Victory Points (VP)

You earn VP by:
*   Rolling **Pickpocket** or **Power Move**.
*   Surviving a round (**+1 VP**).
*   Eliminating another player (**+2 VP**).

VP decides the final ranking.

---

### 🏁 Ending the Game

The game ends when:
1.  Only **1 player remains alive**, OR
2.  **12 rounds** are finished (Standard limit).

Then all players (alive and fallen) are ranked.

---

### 🥇 How Top 3 Is Decided

Players are ranked using these rules (in priority order):

1.  **Highest Victory Points (VP)**
2.  If tied → **Higher HP** (at the time of elimination or end of game).
3.  If still tied → **Fewer rounds spent as Fallen Player**.
4.  Still tied? → **One final dice roll**.

This always gives a clear **Top 3**.

---

### ✅ Why This Game Is Fun

*   No one sits idle.
*   Eliminated players still matter (Kingmakers).
*   Simple rules, exciting outcomes.
*   Social, unpredictable, and replayable.

---

### 🎉 Optional Fun Variations

*   Limit the game to **10 rounds** for faster play.
*   Give each player **one reroll token** for the whole game.
*   Add secret goals (example: "Finish with 8+ VP").

---

**Last Roll Standing** rewards smart choices, timing, and a little bit of luck. Anyone can win — and everyone plays till the end.