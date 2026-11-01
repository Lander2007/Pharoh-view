'use client'

// Zero-dependency Procedural Web Audio Engine
// Generates warm, subtle architectural UI acoustics directly via Web Audio API

class ProceduralSoundEngine {
  private ctx: AudioContext | null = null
  private muted: boolean = false
  private isInitialized: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pharoview_sound_muted')
      // Muted by default to respect user browsing context, easily enabled via Nav
      this.muted = saved !== null ? saved === 'true' : false
    }
  }

  private initCtx() {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  public isMuted(): boolean {
    return this.muted
  }

  public toggleMute(): boolean {
    this.muted = !this.muted
    if (typeof window !== 'undefined') {
      localStorage.setItem('pharoview_sound_muted', String(this.muted))
    }
    if (!this.muted) {
      this.playClickTick()
    }
    return this.muted
  }

  /**
   * Ultra-subtle, warm mechanical tick (800Hz short sine/triangle envelope, duration: 0.015s, gain: 0.03)
   * on button/card hover and navigation items.
   */
  public playHoverTick() {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(820, now)
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.015)

      gain.gain.setValueAtTime(0.028, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.016)
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Crisp tactile micro-click on button press
   */
  public playClickTick() {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1100, now)
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.025)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.026)
    } catch {
      //
    }
  }

  /**
   * Soft low-frequency spatial hum sweep when toggling "INSPECT 3D GEOMETRY"
   */
  public playInspectHum() {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const sub = ctx.createOscillator()
      const filter = ctx.createBiquadFilter()
      const gain = ctx.createGain()

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(320, now)
      filter.frequency.exponentialRampToValueAtTime(140, now + 0.38)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(120, now)
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.22)
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.38)

      sub.type = 'triangle'
      sub.frequency.setValueAtTime(60, now)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.05, now + 0.08)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38)

      osc.connect(filter)
      sub.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      sub.start(now)
      osc.stop(now + 0.39)
      sub.stop(now + 0.39)
    } catch {
      //
    }
  }

  /**
   * Fast micro-tick for animated number counters
   */
  public playCounterTick() {
    if (this.muted) return
    const ctx = this.initCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'square'
      osc.frequency.setValueAtTime(1200, now)

      gain.gain.setValueAtTime(0.008, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.009)
    } catch {
      //
    }
  }
}

export const soundEngine = new ProceduralSoundEngine()

