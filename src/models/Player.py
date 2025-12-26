from __future__ import annotations
from ..utils import MaxPlayersValidator, InvalidPlayerActionValidator, GameStateValidator
from ..helpers import Randomizer
from colorama import init, Fore
from enum import Enum
from typing import Union

init(autoreset=True)


#  Enums classes representing possible dice face outcomes
class ActiveFace(Enum):
    BACKFIRE = "Backfire"
    POWER_MOVE = "Power Move"
    RECOVER = "Recover"
    JAB = "Jab"
    STRIKE = "Strike"
    PICKPOCKET = "Pickpocket"


class Status(Enum):
    FALLEN = "fallen"
    ALIVE = "alive"


class FallenFace(Enum):
    NOTHING_1 = "Nothing"
    PLUS2HP_OR_PLUS1VP = "+2 HP OR +1 VP to any alive player"
    REMOVE2HP_OR_MINUS1VP = "Remove −2 HP OR −1 VP from any alive player"
    PLUS2HP_OR_PLUS1VP_2 = "+2 HP OR +1 VP to any alive player"
    REMOVE2HP_OR_MINUS1VP_2 = "Remove −2 HP OR −1 VP from any alive player"
    NOTHING_2 = "Nothing"


class Player:
    """
    Player model that represents a player in the game with its in game methods and attrs.

    Attributes:
        name (str): The name of the player.
        hp (int): The health points of the player Default is 20.
        vp (int): The victory points of the player Default is 0.
        status (str): The status of the player (alive or fallen) Default is "alive".
        avatar_url (str): The URL of the player's avatar image Default is "../assests/default.png".

    Methods:
        participlate_in_game(): Method for player to participate in the game player list.
        arrange_players_initially(): Class method to arrange players initially in a pseudo-random order.
        roll_dice(): Method for player to roll a dice.
        take_damage(damage): Method for player to take damage and update health points (hp).
        heal(heal_hp): Method for player to heal and update health points (hp).
        gain_vp(vp): Method for player to gain victory points (vp).
        steal_vp(target_player, vp): Method for player to steal victory points (vp) from another player.
    """

    player_arrangement = list()

    active_face_vals = {
        1: ActiveFace.BACKFIRE,
        2: ActiveFace.POWER_MOVE,
        3: ActiveFace.RECOVER,
        4: ActiveFace.JAB,
        5: ActiveFace.STRIKE,
        6: ActiveFace.PICKPOCKET,
    }

    fallen_face_vals = {
        1: FallenFace.NOTHING_1,
        2: FallenFace.PLUS2HP_OR_PLUS1VP,
        3: FallenFace.REMOVE2HP_OR_MINUS1VP,
        4: FallenFace.PLUS2HP_OR_PLUS1VP_2,
        5: FallenFace.REMOVE2HP_OR_MINUS1VP_2,
        6: FallenFace.NOTHING_2,
    }

    def __init__(
        self,
        name,
        hp=20,
        vp=0,
        status: Status = Status.ALIVE,
        avatar="../assests/default.png",
    ) -> None:
        self.name = name
        self.__hp = hp
        self.__vp = vp
        self.avatar_url = avatar
        self.status = status
        self.player_id = None
        self.last_targetedby = None
        self.last_targetedto = None
        self.rounds_survived = 0

        try:
            self.participlate_in_game()
        except MaxPlayersValidator as e:
            print(Fore.RED + str(e))
            exit()

        # Arrange players automatically when 5 players have participated
        if len(Player.player_arrangement) == 5:
            Player.arrange_players_initially()

    def participlate_in_game(self) -> bool | MaxPlayersValidator:
        """
        Method for player to participate in the game player list.
        Maximum 5 players are allowed to participate.
        Raises:
            MaxPlayersValidator: If maximum player limit is reached.

        Returns:
            bool: True if participation is successful, False otherwise.
        """
        if len(Player.player_arrangement) < 5:
            Player.player_arrangement.append(self)
            return True
        else:
            raise MaxPlayersValidator(
                "Maximum player limit reached. Cannot add more players."
            )

    @classmethod
    def arrange_players_initially(cls) -> bool:
        """
        Class method to arrange players initially in a pseudo-random order.
        Returns:
           bool: True if arrangement is successful, False otherwise.
        """
        try:
            cls.player_arrangement = Randomizer.arrange_players_initially(
                cls.player_arrangement
            )
            return True
        except Exception as e:
            print(Fore.RED + f"Error arranging players: {e}")
            return False

    def roll_dice(self) -> Union[ActiveFace, FallenFace]:
        """
        Method for player to roll a dice.

        Returns:
            Union[ActiveFace, FallenFace]: The enum member representing the dice face outcome
                for an alive (`ActiveFace`) or fallen (`FallenFace`) player.
        """
        if self.status == "alive":
            return Player.active_face_vals[Randomizer.roll_dice()]
        else:
            return Player.fallen_face_vals[Randomizer.roll_dice()]

    @property
    def __set_player_to_fallen(self) -> bool :
        """
        Setter  for __set_player_to_fallen
        """
        # No need for re-check as this is a private property
        self.status = Status.FALLEN
        return True

    def take_damage(self, damage: int) -> bool | InvalidPlayerActionValidator | GameStateValidator:
        """
        Method for player to take damage and update health points (hp).
        Args:
            damage (int): The amount of damage to be taken.
        Returns:
            bool: True if damage is taken successfully, False otherwise.
        """
        if damage > 0:
            if self.status != Status.FALLEN:
                self.__hp -= damage
                if (
                    self.__hp <= 0
                ):  # check if after updating the dmg player is set to be fallen or not
                    self.__set_player_to_fallen
            else:
                raise InvalidPlayerActionValidator("Fallen Player cannot take further damage")
        else:
            raise GameStateValidator("Provided Damage must be non negative")

    def heal(self, heal_hp: int) -> bool | InvalidPlayerActionValidator | GameStateValidator:
        """
        Method for player to heal and update health points (hp).
        Args:
            heal_hp (int): The amount of healing to be applied.
        Returns:
            bool: True if healing is applied successfully, False otherwise.
        """
        if heal_hp > 0 and heal_hp <= 20:
            if self.status != Status.FALLEN:
                self.__hp += heal_hp
                return True
            else:
                raise InvalidPlayerActionValidator("Fallen Player Cannot be healed")
        else:
            raise GameStateValidator("Provided heal Vlaue should be within 0-20 ")

    def gain_vp(self, vp_increment: int) -> bool | GameStateValidator:
        """
        Method for player to gain victory points (vp).
        Args:
            vp_increment (int): The amount of victory points to be gained.
        Returns:
            bool: True if victory points are gained successfully, False otherwise.
        """
        if vp_increment > 0 and vp_increment <= 3:
            self.__vp += vp_increment
        else:
            raise GameStateValidator("Game is defiend for vp transcation between 1 to 3")

    def steal_vp(self, target_player: Player, vp_to_steal: int) -> bool | InvalidPlayerActionValidator | GameStateValidator | Exception:
        """
        Method for player to steal victory points (vp) from another player.
        Args:
            target_player (Player): The player from whom victory points are to be stolen.
            vp_to_steal (int): The amount of victory points to be stolen.
        Returns:
            bool: True if victory points are stolen successfully, False otherwise.
        """
        if  isinstance(target_player,Player):
            if target_player.__vp > 0  or target_player.__vp <= vp_to_steal:
                target_player.__vp -= vp_to_steal
                self.gain_vp(vp_increment=vp_to_steal)
                return True
            else :
                raise InvalidPlayerActionValidator("Target Player has insufficent vp provided")
        else:
            raise Exception("Target player must be the instance of Player class")

    @property
    def hp(self) -> int:
        """
        getter for hp

        :param self: instance of class Player
        :return: int
        """
        return self.__hp

    def __repr__(self) -> str:
        return f"{Fore.GREEN} Player(name={self.name}, hp={self.hp}, vp={self.vp}, status={self.status})"
