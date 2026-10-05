/**
 * Premium lifestyle / architecture imagery for INOVIX.
 * Each key maps to a topic-matched local asset (no shared duplicates across offerings).
 */
const u = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  home: {
    /** Evening villa patio + pool */
    hero: "/hero-villa.jpg",
    /** Living room with recessed speakers — AV lifestyle */
    showroomMain: "/services/av.jpg",
    /** Luxury glass intercom on stone villa entrance */
    showroomSecurity: "/services/security.jpg",
    /** Clean organized residential network rack */
    showroomNetwork: "/services/networking.jpg",
    /** Architectural recessed speakers in luxury living */
    showroomAv: "/services/av-audio.jpg",
    /** Villa courtyard lifestyle */
    contact: "/contact-villa.jpg",
  },
  about: {
    hero: u("photo-1600596542815-ffad4c1539a9", 1400),
    team: u("photo-1600573472550-8090b5e0745e", 1400),
    process: u("photo-1588854337236-6889d631faa8", 1400),
  },
  blog: {
    hero: "/blog/blog-hero-v3.jpg",
    smartHome: "/blog/blog-smart-planning-v3.jpg",
    smartHomePrep: "/blog/blog-smart-home-prep.jpg",
    wireless: "/blog/blog-wireless-palwintec-v3.jpg",
    wifi: "/blog/blog-network-infra-v5.jpg",
    security: "/blog/blog-security-peace-v3.jpg",
    av: "/blog/blog-luxury-av-v3.jpg",
    wiredCameras: "/blog/blog-wired-cameras.jpg",
    planningMistakes: "/blog/blog-planning-mistakes.jpg",
  },
  services: {
    /** Security hero — PTZ camera on luxury villa */
    security: "/services/security.jpg",
    securityCameras: "/services/security-cameras.jpg",
    securityAlarm: "/services/security-alarm-jamb-high.jpg",
    securityIntercom: "/services/security-smart-intercom.jpg",
    securitySmartLock: "/services/security-smart-lock.jpg",
    /** Open tidy rack — professional cabling & LED status */
    networking: "/services/networking.jpg",
    networkingHome: "/services/networking-home-card-v2.jpg",
    networkingRack: "/services/networking-rack-dedicated.jpg",
    networkingCat7: "/services/networking-cat7.jpg",
    networkingSwitch: "/services/networking-switch-yellow.jpg",
    networkingAp: "/services/networking-ap-ubiquiti.jpg",
    /** Living room with recessed architectural speakers */
    av: "/services/av.jpg",
    avMounts: "/services/av-mounts-tv-lift-v2.jpg",
    avScreens: "/services/av-screens-user-pool-card.jpg",
    avAudio: "/services/av-audio-outdoor-speaker.jpg",
    avOffice: "/services/av-office.jpg",
    avCinema: "/services/av-cinema.jpg",
    /** Flush wall touchscreen — home control brain */
    smartHome: "/services/smart-home.jpg",
    smartKnx: "/services/smart-knx-user-panel.jpg",
    smartPalwintec: "/services/smart-zigbee-control4-v2.jpg",
    smartDomex: "/services/smart-domex-user-panel.jpg",
  },
  projects: {
    /** Penthouse living room — AV / smart lifestyle */
    penthouse: "/projects/testimonial-penthouse.jpg",
    /** Herzliya office — networking workplace */
    office: "/projects/testimonial-office.jpg",
    /** Garden villa patio — outdoor living site */
    garden: "/projects/testimonial-garden.jpg",
  },
} as const;
