type QueueItem = () => Promise<void>

export default class Typewriter {
  queue: QueueItem[] = []
  element: HTMLElement
  loop: boolean
  typingSpeed: number
  deletingSpeed: number

  constructor(parent: HTMLElement, {loop = false, typingSpeed = 50, deletingSpeed = 50} = {}) {
    this.element = document.createElement('div')
    this.element.classList.add('whitespace')
    parent.append(this.element)
    this.loop = loop
    this.typingSpeed = typingSpeed
    this.deletingSpeed = deletingSpeed
  }

  typeString(string: string) {
    this.addToQuee(resolve => {
        // Add string to screen
      let i = 0

      const interval = setInterval(() => {
        this.element.append(string[i]);
        i++
        if (i >= string.length) {
          resolve()
          clearInterval(interval)
        }
      }, this.typingSpeed)
    })
    return this
  }

  deleteChars(number: number) {
    this.addToQuee(resolve => {
      // Add string to screen
      let i = 0

      const interval = setInterval(() => {
        this.element.innerText = this.element.innerText?.substring(0, this.element.innerText.length - 1)
        i++
        if (i >= number) {
          resolve()
          clearInterval(interval)
        }
      }, this.deletingSpeed)
    })

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

  addToQuee(cb: (resolve: () => void) => void): void {
    this.queue.push(() => new Promise(cb))
  }
}
