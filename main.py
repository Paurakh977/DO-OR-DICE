from __future__  import annotations
from src import Randomizer
from src import Player
names= ["Jhon Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Davis"]
def main():
    for player in names:
        Player(name=player)
    print(Player.player_arrangement) # check if arrangement is done



if __name__ == "__main__":
    main()

