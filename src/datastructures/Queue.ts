class QueueNode<T> {
    value: T;
    next: QueueNode<T> | null

    constructor(value: T) {
        this.value = value;
        this.next = null
    }
}


export class Queue<T> {
    private head: QueueNode<T> | null
    private tail: QueueNode<T> | null
    private max: number | null
    private total: number

    constructor(item?: T | Iterable<T>, options?: { maxNumberOfItems: number }) {
        this.head = null
        this.tail = null
        this.max = options?.maxNumberOfItems || null
        this.total = 0

        if (item) {
            //@ts-ignore
            if (typeof item[Symbol.iterator] === 'function') {
                //@ts-ignore
                const iterator = item[Symbol.iterator]()
                let result = iterator.next()
                while (!result.done) {
                    this.enqueue(result.value)
                    result = iterator.next()
                }
            } else {
                //@ts-ignore
                this.enqueue(item)
            }
            return
        }

    }

    private validateLength() {
        if (this.max && this.max >= this.total) {
            return
        } else {
            this.dequeue()
            this.validateLength()
        }
    }

    enqueue(item: T) {
        const newNode = new QueueNode(item)

        if (this.tail === null) {
            this.head = newNode
            this.tail = newNode
        } else {
            this.tail.next = newNode
            this.tail = newNode
        }

        this.total += 1

        if (this.max) {
            this.validateLength()
        }
    }

    dequeue(): T | undefined {
        if (this.head === null) {
            return undefined
        }

        const dequeuedValue = this.head.value
        this.head = this.head.next

        if (this.head === null) {
            this.tail = null
        }

        this.total -= 1

        return dequeuedValue
    }

    size(): number {
        let count = 0;
        let currentNode = this.head

        while (currentNode !== null) {
            count++
            currentNode = currentNode.next
        }

        return count
    }

    has(item: T, reorder?: boolean): boolean {

        let currentNode = this.head
        let previousNode = null

        while (currentNode !== null) {
            if (!this.tail) {
                return false
            }

            if (JSON.stringify(item) === JSON.stringify(currentNode.value)) {
                if (this.tail === currentNode) {
                    return true
                }

                if (reorder) {
                    if (!previousNode) {
                        this.head = currentNode.next || currentNode
                    } else {
                        previousNode.next = currentNode.next
                    }

                    this.tail.next = currentNode
                    this.tail = currentNode
                    currentNode.next = null
                }
                return true
            } else {
                if (reorder) previousNode = currentNode
                currentNode = currentNode.next
            }
        }

        return false
    }

    toArray() {
        const array: T[] = []
        let currentNode = this.head

        while (currentNode !== null) {
            array.push(currentNode.value)
            currentNode = currentNode.next
        }
        return array
    }

    clear() {
        this.head = null
        this.tail = null
    }

}