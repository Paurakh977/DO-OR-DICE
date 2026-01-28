# Do Or Dice - Project Documentation
## Workflow & Architecture Guide

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Component Breakdown](#component-breakdown)
4. [Data Flow & Interactions](#data-flow--interactions)
5. [Orchestration Patterns](#orchestration-patterns)
6. [Development & Testing](#development--testing)

---

## Project Overview

**Do Or Dice** is an interactive, turn-based dice game developed in Python using `pygame-ce`. The game involves players rolling dice to attack, heal, steal victory points (VP), or perform special moves. Players can be "Alive" or "Fallen", with different abilities depending on their status. The project is designed with a clean separation between the core game logic (backend) and the graphical interface (frontend).

### Core Gameplay Loop

The game follows a simple six-phase cycle:

```text
      +-------------+      +-------------+      +-------------+
      |  Roll Dice  |----->| Apply Result|----->| Update Stats|
      +-------------+      +-------------+      +-------------+
             ^                                         |
             |                                         v
      +-------------+      +-------------+      +-------------+
      |  Next Turn  |<-----| Recalc Ranks|<-----| Log History |
      +-------------+      +-------------+      +-------------+
```

### Gameplay Phases

| Phase | Description | Responsible Component |
|-------|-------------|----------------------|
| **1. Roll** | Active player rolls dice | `Player.roll_dice()` |
| **2. Resolution** | Apply face effect - damage, heal, steal | `Action_service.execute_action()` |
| **3. Update** | Modify HP/VP, log events | `Player` models + `HistoryService` |
| **4. Ranking** | Recalculate player standings | `IngameRankService` |
| **5. Transition** | Pass control to next player | `TurnResolverService` |
| **6. End Check** | Verify if max rounds reached | `GameController` / `ui.Game` |

### Player State Transitions

```text
      (HP = 0)
   +---------+  -------------------->  +----------+
   |  ALIVE  |                         |  FALLEN  |
   +---------+  <--------------------  +----------+
                    (Revive Action)

Notes:
- Alive: Can use Active Faces, Full ability set
- Fallen: Limited to Fallen Faces, Reduced abilities
```

---

## System Architecture

### High-Level Architecture Diagram

```text
    +-----------------------+           +-----------------------+
    |   PRESENTATION        |---------->|   CONTROL             |
    |   - ui/game.py        |           |   - Action Service    |
    |   - Components/Theme  |           |   - Game Controller   |
    +-----------------------+           +-----------------------+
               |                                    |
               v                                    v
    +-----------------------+           +-----------------------+
    |   SERVICES            |<----------|   MODELS              |
    |   - Turn Resolver     |           |   - Player Models     |
    |   - History Service   |           |   - Dice Definitions  |
    |   - Rank Service      |           +-----------------------+
    +-----------------------+
               |
               v
    +-----------------------+
    |   UTILITIES           |
    |   - Randomizer        |
    |   - Validators        |
    +-----------------------+
```

### MVC-Inspired Pattern

The system follows a Model-View-Controller inspired architecture:

```text
    +----------+         +--------------+         +---------+
    |   VIEW   |-------->|  CONTROLLER  |-------->|  MODEL  |
    |   (UI)   |         |  (Services)  |         |  (Data) |
    +----------+         +--------------+         +---------+
         ^                                             |
         |                                             |
         +---------------------------------------------+
                        (Data Updates)
```

**Mapping:**
*   **Model:** `Player`, `Dice`, `Game State`
*   **View:** `UI Components`, `Rendering`, `Animations`
*   **Controller:** `Action Service`, `Turn Resolver`, `Game Controller`

### Architectural Principles

| Principle | Implementation |
|-----------|---------------|
| **Separation of Concerns** | UI never contains business logic |
| **Single Responsibility** | Each service handles one domain |
| **Dependency Inversion** | Services depend on abstractions |
| **Event Sourcing** | Immutable history log of all actions |

---

## Component Breakdown

### Directory Structure

```
do-or-dice/
│
├── models/                 # Data structures & entities
│   ├── Player.py          # Core player entity
│   ├── Dice.py            # Dice face definitions
│   └── __init__.py        # Model exports
│
├── services/               # Business logic layer
│   ├── TurnResolverService.py
│   ├── HistoryService.py
│   ├── Rank.py
│   └── types.py
│
├── controllers/            # Mediation & orchestration
│   ├── api.py             # Action service
│   └── orchestrator.py    # CLI game controller
│
├── ui/                     # Presentation layer
│   ├── game.py            # Main UI orchestrator
│   ├── components.py      # Reusable widgets
│   ├── theme.py           # Visual styling
│   └── player_profiles.py # Player configurations
│
├── utils/                  # Utilities
│   └── validators.py      # Data validation
│
├── helpers/                # Helper functions
│   └── randomizer.py      # Custom RNG
│
└── tests/                  # Test suite
    └── test_game_integration.py
```

### Component Responsibilities

#### Model Layer (models/)

**Player.py** - The core entity
- Stores state: `hp`, `vp`, `status`, `name`
- Contains methods for participation
- Implements raw `roll_dice()` logic

**Dice.py** - Dice definitions
- Defines Enum classes for dice faces
- `ActiveFace` - faces available when alive
- `FallenFace` - faces available when fallen
- Face-to-action mappings

#### Service Layer (services/)

**TurnResolverService.py** - Turn management
- Role: Manages the sequence of turns
- Dual Mode: CLI resolution and UI participant management
- Functions: `resolve_turns()`, `get_next_player()`

**HistoryService.py** - Event logging
- Role: Immutable ledger of all game events
- Function: Records damage, healing, and VP changes
- Used to generate game logs and replays

**Rank.py (IngameRankService)** - Player rankings
- Role: Calculates player standings
- Function: Sorts players by VP (primary) and HP (secondary)
- Determines winner at game end

**types.py** - Type definitions
- Defines typed dictionaries (e.g., `EventRecord`)
- Ensures strict typing throughout services

#### Controller Layer (controllers/)

**api.py (Action_service)** - Action execution
- Role: Bridge between intent and data modification
- Function: `execute_action()` takes player, action, and target
- Safely modifies Player models and logs to HistoryService

**orchestrator.py (GameController)** - CLI orchestration
- Role: CLI game loop orchestrator
- Handles text-based/headless execution
- Note: PyGame UI implements own orchestration

#### Presentation Layer (ui/)

**game.py** - UI Orchestrator
- Initializes PyGame and all services
- Manages visual state machine (IDLE, TARGET, CHOICE)
- Handles input events (mouse clicks, buttons)
- Renders game loop (background, player visuals, dice)

**components.py** - UI Widgets
- Reusable components
- `PlayerVisual`, `Dice`, `LogFeed`, `Button`

**theme.py** - Visual styling
- Stores colors, fonts, drawing primitives

**player_profiles.py** - Player configuration
- Configuration for player names and avatars

#### Utility Layer (utils/ & helpers/)

**helpers/randomizer.py** - Random number generation
- Custom RNG logic using time microseconds
- Provides "extreme randomness" for dice rolls

**utils/validators.py** - Data validation
- Custom exceptions and validation logic
- `MaxPlayersValidator`, `GameStateValidator`
- Ensures data integrity

### Responsibility Matrix

| Layer | Component | Primary Responsibility | Key Methods |
|-------|-----------|----------------------|-------------|
| **Model** | `Player.py` | Store player state (HP, VP, status) | `roll_dice()`, `take_damage()`, `heal()` |
| **Model** | `Dice.py` | Define dice faces & mappings | Enum definitions |
| **Service** | `TurnResolverService` | Manage turn sequence | `resolve_turns()`, `get_next_player()` |
| **Service** | `HistoryService` | Log game events immutably | `record_event()`, `get_history()` |
| **Service** | `IngameRankService` | Calculate player rankings | `check_rank()`, `sort_by_vp()` |
| **Controller** | `Action_service` | Execute & validate actions | `execute_action()`, `validate()` |
| **Controller** | `GameController` | CLI orchestration | `run_game()`, `game_loop()` |
| **UI** | `game.py` | GUI orchestration & state | `handle_input()`, `render()` |
| **UI** | `components.py` | Reusable UI widgets | `PlayerVisual`, `Dice`, `Button` |

---

## Data Flow & Interactions

### User Action Workflow

Here's what happens when a user performs an action (e.g., "Player Rolls a Strike"):

```text
  USER            UI            CONTROLLER         MODEL
   |              |                 |                |
   o-- Click ---->|                 |                |
   |              |--- Roll ------->|                |
   |              |<-- Face --------|                |
   |              |                 |                |
   o-- Target --->|                 |                |
   |              |--- Action ----->|                |
   |              |                 |--- Update ---->|
   |              |                 |<-- State ------|
   |              |<-- Visual ------|                |
   v              v                 v                v
```

### Complete Turn Resolution Pipeline

```text
    [ Turn Start ]
          |
          v
    [ Player Rolls ]
          |
          +---> [ Strike/Heal ] ---> [ Select Target ] --+
          |                                              |
          +---> [ Pickpocket  ] ---> [ Select Target ] --+
          |                                              |
          +---> [ Duelist     ] ---> [ Choose Action ] --+--> [ Execute ]
          |                                              |         |
          +---> [ Auto-Exec   ] -------------------------+         v
                                                             [ Update Stats ]
                                                                   |
                                                                   v
                                                              [ Log History ]
                                                                   |
                                                                   v
    [ Next Turn ] <--- [ Update UI ] <--- [ Recalc Ranks ] <-------+
```

### Service Interaction Map

```text
    +-------------+
    | UI Requests |
    +-------------+
           | (Roll/Action)
           v
    +------------------+
    |  CORE SERVICES   |
    | - Action Service |
    | - Turn Resolver  |
    | - History Service|
    | - Rank Service   |
    +------------------+
           |
           v
    +------------------+
    |   DATA MODELS    |
    | - Player Models  |
    | - Dice Defs      |
    +------------------+
```

### Key Interaction Points

#### UI to Controllers

The UI does **not** contain business logic. It delegates all game rule enforcement to `Action_service`.

**Example:** When a player rolls "PICKPOCKET"
1. UI collects the target from user click
2. UI calls `action_service.execute_action(..., action=PICKPOCKET, target=target)`
3. Service handles actual VP deduction and addition

#### Turn Resolution & Dice

- `TurnResolverService` is the conceptual owner of a "Round"
- In UI, `Game` class manually advances turn and round counters
- Syncs with `TurnResolverService`'s participant list to know whose turn it is

#### History & Ranking

**History:**
- Every successful action creates an `EventRecord` in `HistoryService`
- UI polls this service to populate the `LogFeed` sidebar

**Ranking:**
- After every round or significant action, `IngameRankService.check_rank()` is called
- If order changes, UI rearranges `PlayerVisual` components on screen

---

## Orchestration Patterns

### Dual Orchestration Architecture

The application features **two** orchestration patterns depending on the interface:

```text
       CLI MODE (Blocking)             GUI MODE (Event Driven)
      =====================           =========================

         [ Game Start ]                     [ Game Start ]
               |                                  |
               v                                  v
      +--> [ While Loop ]                +--> [ Event Loop ]
      |        |                         |        |
      |   [ Turn Rslvr ]                 |   [ State Mach ]
      |        |                         |        |
      |   [ Wait Input ]                 |   [ User Click ]
      |     (Blocks)                     |   (Non-blocking)
      |        |                         |        |
      +--------+                         +--------+
```

### CLI Orchestration (controllers/orchestrator.py)

**Characteristics:**
- Uses a blocking `while` loop
- Calls `TurnResolverService.resolve_turns()`
- Halts execution to wait for `input()` from console
- Used primarily for integration testing and logic verification

```python
# Pseudocode
while not game_over:
    current_player = turn_resolver.get_current_player()
    face = current_player.roll_dice()
    target = input("Select target: ")  # Blocks here
    action_service.execute_action(current_player, face, target)
    turn_resolver.next_turn()
```

### GUI Orchestration (ui/game.py)

**Characteristics:**
- Uses an **Event-Driven Loop** (standard game loop)
- Never blocks - always responsive to input
- Implements a state machine for turn flow

#### GUI State Machine

```text
             (Click Dice)
    [ IDLE ] -----------> [ ROLLING ]
       ^                       |
       |           +-----------+-----------+
       |           |           |           |
       |      (Target?)    (Choice?)    (Auto?)
       |           |           |           |
       |           v           v           v
       |      [ TARGET ]   [ CHOICE ]      |
       |           |           |           |
       +-----------+-----------+           |
                   |                       |
                   +-----------------------+
```

#### State Descriptions

| State | Purpose | User Actions |
|-------|---------|--------------|
| **IDLE** | Waiting for dice roll | Click dice to roll |
| **ROLLING** | Animation playing | None - locked |
| **TARGET** | Need target selection | Click opponent avatar |
| **CHOICE** | Need strategic choice | Click action button |
| **END** | Game concluded | View results |

### Orchestration Comparison

| Aspect | CLI Mode | GUI Mode |
|--------|----------|----------|
| **Loop Type** | Blocking `while` loop | Non-blocking event loop |
| **Input Method** | `input()` - halts execution | Event polling - continues |
| **State Management** | Linear sequence | State machine |
| **Turn Resolution** | `TurnResolverService.resolve_turns()` | Manual stepping via `ui.Game` |
| **Use Case** | Testing, headless execution | Interactive gameplay |
| **Responsiveness** | Blocks until input | Always responsive |
| **Window** | Terminal only | PyGame window |

### Coordination Logic

**CLI:**
- `GameController` calls `TurnResolverService` directly
- Service manages entire turn lifecycle
- Blocking calls ensure sequential execution

**GUI:**
- `Game` class manually steps through turn phases
- Calls `Action_service` only when user input captured
- Ensures window never "freezes" while waiting for decision

---

## Development & Testing

### Testing Architecture

```text
    +-------------+          +--------------+
    | Integration |--------->| Mock Objects |
    |    Tests    |          |              |
    +-------------+          +--------------+
           |                        |
           v                        v
    +--------------+         +--------------+
    | Action Svc   |<--------| Turn Rslvr   |
    +--------------+         +--------------+
           |                        |
           v                        v
    +--------------+         +--------------+
    | Player Models|<--------| History Svc  |
    +--------------+         +--------------+
```

### Test Coverage Strategy

The project includes a `tests/` directory that leverages the separated architecture.

| Test Type | Coverage | Files | Purpose |
|-----------|----------|-------|---------|
| **Integration** | Full game simulation without UI | `test_game_integration.py` | Verify game logic end-to-end |
| **Unit** | Individual service functions | Per-service test files | Test isolated functionality |
| **Mock** | `input()`, `Randomizer` | Test fixtures | Control randomness and input |

**Key Testing Principle:**
- Instantiate Services and Models *without* the UI
- Mock `input()` and `Randomizer` to simulate scenarios
- Ensures core game logic is robust independent of graphics

### Dependency Graph

```text
    [ External Libs ]
    (pygame, pydantic)
            |
            v
       [ UI Layer ]
            |
            v
      [ Controllers ]
            |
            v
       [ Services ]
            |
            v
        [ Models ]
```

### Build & Configuration

**pyproject.toml** - Central configuration file

**Dependencies:**
- `pygame-ce` - Game engine
- `pygame-gui` - UI components
- `pydantic` - Data validation
- `colorama` - CLI colors

**Build System:**
- Entry point: `ui.game:run_game`
- Test config: `pytest` integration
- Package metadata and versioning

### Development Workflow

```text
    [ Code Change ]
          |
          +---> ( Model ) -----> [ Unit Tests  ]
          |
          +---> (Service) -----> [ Integ Tests ]
          |
          +---> (  UI   ) -----> [ Manual QA   ]
                                       |
                                       v
                                [ Commit & Push ]
```

### Testing Commands

```bash
# Run all tests
pytest tests/

# Run with coverage
pytest --cov=models --cov=services --cov=controllers

# Run specific test file
pytest tests/test_game_integration.py

# Run with verbose output
pytest -v
```

---

## Key Design Patterns

### Separation of Concerns

```text
    +--------------+                    +--------------+                  +--------------+
    | PRESENTATION | --(Delegates)--->  |  BIZ LOGIC   | --(Modifies)---> |     DATA     |
    | - Rendering  |                    | - Game Rules |                  | - Player St  |
    | - User Input |                    | - Validation |                  | - History    |
    +--------------+                    +--------------+                  +--------------+
```

### Service Layer Benefits

**Reusability**
- Same services power CLI and GUI
- Services can be used in future web/mobile interfaces

**Testability**
- Services tested without UI dependencies
- Mock objects enable controlled testing

**Maintainability**
- Business logic centralized in one location
- Changes propagate to all interfaces

**Flexibility**
- Easy to add new interfaces (Discord bot, web app)
- Core logic remains unchanged

### Design Pattern Summary

| Pattern | Location | Benefit |
|---------|----------|---------|
| **MVC** | Overall structure | Clean separation of concerns |
| **Service Layer** | `services/` | Reusable business logic |
| **Event Sourcing** | `HistoryService` | Complete audit trail |
| **State Machine** | `ui/game.py` | Predictable UI behavior |
| **Dependency Injection** | Service initialization | Testable, flexible |

---

## Quick Start Guide

### Installation

```bash
# Clone repository
git clone <repository-url>
cd do-or-dice

# Install dependencies
pip install -e .
```

### Running the Game

```bash
# Run GUI version
python -m ui.game

# Run CLI version (testing)
python -m controllers.orchestrator

# Run tests
pytest tests/
```

### For Developers

**Modifying Models** (`models/`)
- Player attributes (HP, VP, status)
