import { defineStore } from 'pinia'

export const useDigitalHumanStore = defineStore('digitalHuman', {
  state: () => ({
    currentDigitalHumanId: null,
    currentDigitalHumanVideoUrl: null
  }),
  actions: {
    setCurrentDigitalHuman(id, videoUrl) {
      this.currentDigitalHumanId = id
      this.currentDigitalHumanVideoUrl = videoUrl
    },
    clearCurrentDigitalHuman() {
      this.currentDigitalHumanId = null
      this.currentDigitalHumanVideoUrl = null
    }
  }
}) 