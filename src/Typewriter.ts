type QueueItem = () => Promise<void>

export default class Typewriter {
  queue: QueueItem[] = []
  element: HTMLElement
  loop: boolean
  typingSpeed: number
  deletingSpeed: number

  constructor(element: HTMLElement, {loop = false, typingSpeed = 50, deletingSpeed = 50} = {}) {
    this.element = element
    this.loop = loop
    this.typingSpeed = typingSpeed
    this.deletingSpeed = deletingSpeed
  }

  typeString(string: string) {
    this.queue.push(() => {
      return new Promise((resolve) => {
        // Add string to screen
        console.log(string);

        resolve()
      })
    })
    return this
  }

  deleteChars(number: number) {
    console.log(number);

    return this
  }

  deleteAll(deleteSpeed = this.deletingSpeed) {
    console.log(deleteSpeed);

    return this
  }

  pauseFor(duration: number) {
    console.log(duration);

    return this
  }

  async start(){
    for (let cb of this.queue) {
      await cb()

    }
    return this
  }
}
