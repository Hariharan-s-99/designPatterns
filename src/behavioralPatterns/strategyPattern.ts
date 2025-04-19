/**
 * Strategy Pattern:
 * A behavioral design pattern that lets you define a family of algorithms,
 * put each of them into a separate class, and make their objects interchangeable.
 * 
 * Common use cases: different sorting algorithms, compression formats, payment methods, etc.
 */

// Interface that defines the contract for all sorting strategies
interface ISortingAlgorithm {
    executeSort(array: Array<number>): string;
}

// Concrete strategy implementation for Bubble Sort
class BubbleSort implements ISortingAlgorithm {
    executeSort(array: Array<number>) {
        return "sorted using BubbleSort"
    }
}

// Concrete strategy implementation for Merge Sort
class MergeSort implements ISortingAlgorithm {
    executeSort(array: Array<number>) {
        return "sorted using MergeSort"
    }
}

// Concrete strategy implementation for Selection Sort
class SelectionSort implements ISortingAlgorithm {
    executeSort(array: Array<number>) {
        return "sorted using SelectionSort"
    }
}

// Context class that uses a strategy object for the actual sorting operation
class SortingContext {

    // Constructor that accepts the initial sorting strategy
    constructor(private sortingAlgorithm: ISortingAlgorithm) {
    }
    
    // Delegates the sorting operation to the currently set algorithm
    executeSort(array: Array<number>) {
        return this.sortingAlgorithm.executeSort(array);
    }
}

// Function to demonstrate Strategy pattern behavior
export default () => {
    // Create a context with a specific sorting strategy (Merge Sort)
    const sortingContext = new SortingContext(new SelectionSort());
    
    console.log(sortingContext.executeSort([1, 2, 3]));
}