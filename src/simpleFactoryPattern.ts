type CandyType = "sweet" | "spicy";
interface ICandy {
    size: () => number;
    cookCandy: () => string;
}

class SweetCandyFactory implements ICandy {
    size() {
        return 10
    }
    cookCandy() {
        return `cooked and sold a sweet candy with size ${this.size()}`
    }
}

class SpicyCandyFactory implements ICandy {
    size() {
        return 20
    }
    cookCandy() {
        return `cooked and sold a spicy candy with size ${this.size()}`
    }
}
class CandyStore {
    sellCandy(candyType: CandyType) {
        return candyFactory.getCandy(candyType)
    }
}

class candyFactory {
    static getCandy(candyType: CandyType) {
        switch (candyType) {
            case "sweet":
                const sweetCandyFactory = new SweetCandyFactory();
                return sweetCandyFactory.cookCandy();
            case "spicy":
                const spicyCandyFactory = new SpicyCandyFactory();
                return spicyCandyFactory.cookCandy();
            default:
                throw new Error("Invalid candy type")
        }
    }
}

export default () => {
    const candyStore = new CandyStore();
    console.log(candyStore.sellCandy("spicy"))
}