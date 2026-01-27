# IngameRankService Documentation

## Overview
The **IngameRankService** is a ranking system that tracks and maintains player standings throughout the game. It's like a live leaderboard that automatically updates based on player performance (Victory Points and Health Points).

---

## Purpose
- Maintain a real-time leaderboard of all players
- Rank players by Victory Points (VP) and Health Points (HP)
- Detect when rankings change
- Provide quick access to any player's current rank
- Handle tie-breaking scenarios fairly

---

## Key Attributes

### `ranks`
- **Type:** Class-level Dictionary (key: rank position, value: player stats)
- **Purpose:** Stores the current leaderboard
- **Scope:** Shared across all instances (class variable)
- **Structure:** `{1: RankRecord, 2: RankRecord, 3: RankRecord, ...}`

---

## RankRecord Structure

Each rank entry contains:

```
RankRecord {
    player_name: "PlayerA"
    vp_count: 10
    rank: 1
    hp: 8
}
```

---

## Methods

### 1. `initiate_ranks()` 
**What it does:** Sets up the initial leaderboard from all players

**When to use:** At the **start of the game** to populate the ranking system

**How it works:**
1. Clears any existing ranks
2. Takes players from `Player.player_arrangement`
3. Assigns initial ranks based on player order (1, 2, 3, ...)
4. Creates a RankRecord for each player

**Note:** Initial ranks are just based on player order, NOT sorted by VP/HP

---

### 2. `check_rank()` 
**What it does:** Checks if the leaderboard needs updating and updates if needed

**When to use:** After **any action that might change VP or HP**

**Returns:** 
- `True` - Rankings changed and were updated
- `False` - Rankings stayed the same

**How it works:**
1. Refreshes player data (VP, HP) from Player objects
2. Calculates what the sorted order should be
3. Compares current ranks with ideal sorted ranks
4. If different, triggers re-ranking
5. Returns whether a change occurred

**This is your main "orchestrator" method!**

---

### 3. `player_rank()` 
**What it does:** Gets the rank information for a specific player

**Parameters:**
- `player_name` - Name of the player to look up

**Returns:** The player's RankRecord

**Raises:** Error if player not found

**Use case:** Display a specific player's current standing

---

### 4. `get_ranks_list` 
**What it does:** Returns the complete leaderboard as a sorted list

**Returns:** List of RankRecords ordered by rank (1st, 2nd, 3rd, ...)

**Use case:** Display the full leaderboard in the UI

---

### 5. `update_ranks()` (Testing Only)
**What it does:** Public method to force re-ranking

**Important:** Only use for **testing**. In actual game, use `check_rank()` instead!

---

### Internal Methods (Private)

#### `__update_ranks()` 
- Recalculates all ranks based on current VP/HP
- Sorts by: VP (high→low), then HP (high→low), then name (A→Z)
- Reassigns rank positions

#### `__update_data()` 
- Syncs rank data with actual Player objects
- Fetches latest VP and HP values
- Ensures ranks reflect current game state

---

## Ranking Rules

### Sorting Priority (Tie-breaking)
1. **Victory Points (VP)** - Higher is better
2. **Health Points (HP)** - Higher is better (if VP tied)
3. **Player Name** - Alphabetical order (if both VP and HP tied)

### Example:
```
PlayerA: VP=10, HP=8  → Rank 1
PlayerB: VP=10, HP=6  → Rank 2 (same VP, lower HP)
PlayerC: VP=10, HP=6  → Rank 3 (name comes after "PlayerB")
PlayerD: VP=9,  HP=10 → Rank 4 (lower VP)
```

---

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      GAME STARTS                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │   initiate_ranks() called         │
         │   Creates initial leaderboard     │
         └───────────────┬───────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │   Ranks populated from            │
         │   Player.player_arrangement       │
         │                                   │
         │   ranks = {                       │
         │     1: PlayerA data,              │
         │     2: PlayerB data,              │
         │     3: PlayerC data               │
         │   }                               │
         └───────────────┬───────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │      GAME IN PROGRESS             │
         │   Players perform actions:        │
         │   • Roll dice                     │
         │   • Gain/lose VP                  │
         │   • Gain/lose HP                  │
         └───────────────┬───────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │    check_rank() called            │
         │    (After each action)            │
         └───────────────┬───────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │   __update_data() runs            │
         │   Syncs VP/HP from Player objects │
         └───────────────┬───────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │   Calculate ideal sorted order    │
         │   Sort by: -VP, -HP, +name        │
         └───────────────┬───────────────────┘
                         │
                ┌────────┴────────┐
                │                 │
         Ranks changed?      No change?
                │                 │
                ▼                 ▼
    ┌─────────────────┐   ┌─────────────────┐
    │ __update_ranks()│   │  Return False   │
    │ Rebuild ranks   │   │  Keep current   │
    │ dictionary      │   │  ranks          │
    └────────┬────────┘   └─────────────────┘
             │
             ▼
    ┌─────────────────┐
    │  Return True    │
    │  (ranks updated)│
    └────────┬────────┘
             │
             ▼
    ┌─────────────────────────────┐
    │   UI requests leaderboard   │
    │   get_ranks_list called     │
    └──────────────┬──────────────┘
                   │
                   ▼
    ┌─────────────────────────────┐
    │   Returns sorted list:      │
    │   [Rank1, Rank2, Rank3...]  │
    └──────────────┬──────────────┘
                   │
                   ▼
    ┌─────────────────────────────┐
    │   Display in Game UI:       │
    │   🥇 PlayerA - VP:10        │
    │   🥈 PlayerB - VP:8         │
    │   🥉 PlayerC - VP:5         │
    └─────────────────────────────┘
```

---

## Usage Flow

### Game Initialization
```
1. Create player objects
2. Call initiate_ranks()
3. Leaderboard ready!
```

### During Game
```
1. Player action occurs
2. Player VP/HP changes
3. Call check_rank()
4. If True: Rankings updated!
5. If False: No change
```

### Display Leaderboard
```
1. Call get_ranks_list
2. Get sorted list of all players
3. Display in UI
```

### Check Specific Player
```
1. Call player_rank("PlayerA")
2. Get that player's RankRecord
3. Display their position
```

---

## Important Design Decisions

### Class-Level Storage
- `ranks` is a **class variable**, not instance variable
- All instances share the same leaderboard
- Ensures consistency across the game

### Automatic Data Sync
- `check_rank()` always refreshes data before checking
- No manual sync needed
- Always reflects current Player object states

### Smart Updates
- Only re-ranks when necessary
- `check_rank()` returns `False` if no change
- Avoids unnecessary computation

### Tie-Breaking
- Clear, deterministic rules
- No randomness in rankings
- Alphabetical names ensure stability

---

## Common Patterns

### After Any Game Action
```python
# Player gains VP
player.vp += 3

# Check if leaderboard changed
if rank_service.check_rank():
    print("Leaderboard updated!")
    # Maybe show animation or notification
```

### Displaying Leader
```python
ranks = rank_service.get_ranks_list
leader = ranks[0]  # First player
print(f"Leader: {leader['player_name']}")
```

### Player Status Check
```python
my_rank = rank_service.player_rank("PlayerA")
print(f"You are rank #{my_rank['rank']}")
```

---

## Edge Cases Handled

 **Tied VP and HP** - Sorted by name  
 **Player not found** - Raises clear error  
 **Empty player list** - Handled by initiate_ranks  
 **Mid-game joins** - Re-init if needed  

---

## Summary

The IngameRankService is like an **automatic scoreboard** that:
- Knows where every player stands
- Updates instantly when scores change
- Breaks ties fairly and consistently
- Provides easy access to ranking data

Think of it as a smart leaderboard that maintains itself, ensuring everyone always knows who's winning and by how much!