# HistoryService Documentation

## Overview
The **HistoryService** is responsible for tracking and managing all game events during a game session. Think of it as a detailed "game recorder" that captures every action, roll, and consequence that happens in the game.

---

## Purpose
- Records every dice roll and its effects
- Tracks who did what to whom
- Stores damage, healing, and victory point changes
- Converts raw event data into human-readable messages for the UI
- Maintains a complete history of the game (only while the game is running)

---

## Key Attributes

### `history`
- **Type:** Dictionary (key: event ID, value: event details)
- **Purpose:** Stores all recorded events in chronological order
- **Lifetime:** Exists only during the game session (not persistent between games)

---

## Methods

### 1. `record_event()`
**What it does:** Records a single game event with all its details

**Parameters:**
- `event_id` - Unique number for this event
- `rolled_by` - The player who rolled the dice
- `dice_face_value` - What face the dice landed on
- `consumer` - The player affected (target), optional
- `damage_dealt` - How much damage was done, optional
- `healing_done` - How much healing happened, optional
- `vp_gained` - Victory points gained, optional
- `vp_stolen` - Victory points stolen, optional

**Returns:** `True` if successfully recorded, `False` if validation failed

**How it works:**
1. Identifies all participants (roller + target)
2. Packages the effect data into lists
3. Creates an event record with timestamp
4. Validates the event data
5. Stores it in history if valid

---

### 2. `get_events()`
**What it does:** Retrieves event history within a specific range

**Parameters:**
- `start` - Starting index (optional)
- `end` - Ending index (optional)

**Returns:** Dictionary of events in the specified range

**Use case:** Fetch specific portions of game history (e.g., last 10 events)

---

### 3. `refine_event()`
**What it does:** Converts raw event data into readable text for the game UI

**Parameters:**
- `history` - Dictionary of event records to process

**Returns:** List of human-readable strings

**Example outputs:**
- `"PlayerA got strike and dealt -3 damage to PlayerB."`
- `"PlayerC got heal and healed +2 health to PlayerC."`
- `"PlayerD got victory and gained +1 VP."`

---

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      GAME EVENT OCCURS                       │
│              (Player rolls dice, gets result)                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │    record_event() is called       │
         │  with event details & parameters  │
         └───────────────┬───────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │   Identify participants:          │
         │   • Roller (always included)      │
         │   • Consumer/Target (if exists)   │
         └───────────────┬───────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │   Package effects into lists:     │
         │   • Damage dealt                  │
         │   • Healing done                  │
         │   • VP gained                     │
         │   • VP stolen                     │
         └───────────────┬───────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │   Create EventRecord with:        │
         │   • Timestamp                     │
         │   • Participants                  │
         │   • Dice face value               │
         │   • All effects                   │
         └───────────────┬───────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │    Validate EventRecord           │
         │  (EventRecordValidator.validate)  │
         └───────────────┬───────────────────┘
                         │
                ┌────────┴────────┐
                │                 │
             Valid?            Invalid?
                │                 │
                ▼                 ▼
    ┌─────────────────┐   ┌─────────────────┐
    │ Store in history│   │  Return False   │
    │ Return True     │   │  Print error    │
    └─────────────────┘   └─────────────────┘
                │
                ▼
    ┌─────────────────────────────┐
    │   Event stored in history   │
    │   with event_id as key      │
    └─────────────────────────────┘
                │
                ▼
    ┌─────────────────────────────┐
    │  Later: get_events() called │
    │  to retrieve history slice  │
    └──────────────┬──────────────┘
                   │
                   ▼
    ┌─────────────────────────────┐
    │  refine_event() called to   │
    │  convert to readable text   │
    └──────────────┬──────────────┘
                   │
                   ▼
    ┌─────────────────────────────┐
    │   Display in Game UI:       │
    │   "PlayerA got strike and   │
    │    dealt -3 damage to       │
    │    PlayerB."                │
    └─────────────────────────────┘
```

---

## Event Record Structure

Each event stored contains:

```
Event {
    timestamp: when it happened
    participants: [who was involved]
    rolled_by: who rolled the dice
    dice_face_value: what they rolled
    damage_dealt: [(target, amount)]
    healing_done: [(target, amount)]
    vp_gained: [(target, amount)]
    vp_stolen: [(target, amount)]
}
```

---

## Important Notes

### Data Lifetime
- History exists **only during the game session**
- When the game ends, history is lost
- Each new game starts with empty history

### Validation
- All events are validated before storage
- Invalid events are rejected and logged
- Ensures data integrity throughout the game

### Effect Targeting
- If no `consumer` is specified, the roller becomes the target
- Useful for self-affecting actions (healing yourself, etc.)
- Handles "backfire" scenarios automatically

---

## Use Cases

1. **During Game:** Record every action as it happens
2. **UI Display:** Show recent events to players
3. **Game Log:** Provide a complete event timeline
4. **Debugging:** Track what happened and when
5. **Statistics:** Analyze player actions and game flow

---

## Summary

The HistoryService is like a game journalist - it watches everything that happens, writes it down accurately, and can later tell you what happened in a way that makes sense to humans. It's essential for game transparency, UI updates, and maintaining a complete record of the game session.