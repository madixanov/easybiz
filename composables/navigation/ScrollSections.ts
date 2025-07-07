const ScrollSections = (activeId: Ref<string>, activeGroup: Ref<string>) => {
  class AnchorObserver {
    private observer: IntersectionObserver
    private callback: (id: string) => void
    private visibleSections: Map<string, number> = new Map()

    constructor(callback: (id: string) => void) {
      this.callback = callback
      this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
        root: null,
        rootMargin: '0px 0px -40% 0px',
        threshold: [0.3, 0.5, 1.0],
      })
    }

    observe() {
      const sections = document.querySelectorAll<HTMLElement>('.profile-section')
      sections.forEach(section => this.observer.observe(section))
    }

    handleIntersect(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id')
        if (!id) return

        if (entry.isIntersecting) {
          this.visibleSections.set(id, entry.intersectionRatio)
        } else {
          this.visibleSections.delete(id)
        }
      })

      if (this.visibleSections.size > 0) {
        const mostVisible = [...this.visibleSections.entries()].sort((a, b) => b[1] - a[1])[0]
        this.callback(mostVisible[0])

        if (id.startsWith('profile')) {
          activeGroup.value = 'profile'
        } else if (id.startsWith('integrations')) {
          activeGroup.value = 'integrations'
        }
      }
    }

    disconnect() {
      this.observer.disconnect()
    }
  }

  let anchorObserver: AnchorObserver

  onMounted(() => {
    anchorObserver = new AnchorObserver((id) => {
      activeId.value = id
      if (id.startsWith('profile')) {
        activeGroup.value = 'profile'
      } else if (id.startsWith('integrations')) {
        activeGroup.value = 'integrations'
      }
    })
    anchorObserver.observe()
  })

  onBeforeUnmount(() => {
    anchorObserver.disconnect()
  })
}

export default ScrollSections