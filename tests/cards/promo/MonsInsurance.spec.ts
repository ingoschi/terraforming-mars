import { expect } from "chai";
import { MonsInsurance } from "../../../src/cards/promo/MonsInsurance";
import { Color } from "../../../src/Color";
import { Player } from "../../../src/Player";
import { Game } from '../../../src/Game';
import { Resources } from "../../../src/Resources";
import { Sabotage } from '../../../src/cards/Sabotage';
import { OrOptions } from "../../../src/inputs/OrOptions";

describe("MonsInsurance", function () {
    let card : MonsInsurance, player : Player, player2: Player, player3: Player, game: Game;

    beforeEach(function() {
        card = new MonsInsurance();

        player = new Player("test", Color.BLUE, false);
        player2 = new Player("test2", Color.RED, false);
        player3 = new Player("test3", Color.GREEN, false);
        game = new Game("foobar", [player,player2, player3], player);
    });

    it("Should play", function () {
        const play = card.play(player, game);
        expect(play).to.eq(undefined);
        expect(player.getProduction(Resources.MEGACREDITS)).to.eq(4);
        expect(player2.getProduction(Resources.MEGACREDITS)).to.eq(-2);
        expect(player3.getProduction(Resources.MEGACREDITS)).to.eq(-2);
    });

    it("Triggers effect when resources are removed", function () {
        card.play(player, game);
        player.corporationCard = card;
        player.megaCredits = 2;
        player2.titanium = 3;

        const card2 = new Sabotage();
        const action = card2.play!(player3, game) as OrOptions;
        
        action.options[0].cb(player2);
        expect(player2.titanium).to.eq(0);
        expect(player2.megaCredits).to.eq(2);
        expect(player.megaCredits).to.eq(0);
    });
});