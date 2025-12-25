from ..utils import MaxPlayersValidator
from ..helpers import Randomizer
from colorama import init, Fore

init(autoreset=True)

class Player():
    """
    Player model that represents a player in the game with its in game methods and attrs.
    """
    player_arrangement= list ()

    def __init__(self,name, hp = 20, vp=0,status="alive" )-> None:
        self.name = name
        self.hp = hp
        self.vp = vp
        self.status = status
        self.player_id = None
        
        try:
            self.participlate_in_game()
        except MaxPlayersValidator as e:
            print(Fore.RED + str(e))
            exit()

        # Arrange players autoamtically  when 5 players have participated
        if len(Player.player_arrangement) ==5 : 
            Player.arrange_players_initially()

    def participlate_in_game(self)-> bool | MaxPlayersValidator:
        """
        Method for player to participate in the game player list.
        Maximum 5 players are allowed to participate.
        Raises:
            MaxPlayersValidator: If maximum player limit is reached.

        Returns:
            bool: True if participation is successful, False otherwise.
        """
        if len(Player.player_arrangement) <5:
            Player.player_arrangement.append(self)
            return True
        else :
            raise MaxPlayersValidator("Maximum player limit reached. Cannot add more players.")
        
    @classmethod
    def arrange_players_initially(cls)->bool:
        """
        Class method to arrange players initially in a pseudo-random order.
        Returns:
           bool: True if arrangement is successful, False otherwise.
        """
        try:
            cls.player_arrangement = Randomizer.arrange_players_initially(cls.player_arrangement)
            return True
        except Exception as e:
            print(Fore.RED + f"Error arranging players: {e}")
            return False
        

    def __repr__(self)-> str:
        return f"{Fore.GREEN} Player(name={self.name}, hp={self.hp}, vp={self.vp}, status={self.status})"