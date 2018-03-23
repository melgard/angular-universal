import {animate, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';

export const fadeIn =
  trigger('fadeIn', [
    transition('* => *', [
      style({
        opacity: 0,
      }),
      animate('600ms ease-in', keyframes([
        style({
          opacity: 0,
          offset: .1
        }),
        style({
          opacity: .7,
          offset: .8
        }),
        style({
          opacity: 1,
          offset: 1
        })
      ]))
    ])
  ]);
export const fadeInUp =
  trigger('fadeInUp', [
    transition('* => *', [
      style({
        opacity: 0,
        transform: 'translateY(0px)'
      }),
      animate('600ms ease-in', keyframes([
        style({
          opacity: 0,
          transform: 'translateY(20px)'
        }),
        style({
          opacity: .3,
          transform: 'translateY(2px)'
        }),
        style({
          opacity: .7,
          transform: 'translateY(0px)'
        }),
        style({
          opacity: 1,
          transform: 'translateY(0px)'
        })
      ]))
    ])
  ]);

export const tabSelected =
  trigger('tabSelected', [
    state('normal', style({transform: 'translateY(0)', cursor: 'pointer'})),
    state('selected', style({transform: 'translateY(0)'})),
    transition('normal => selected', [
      animate('750ms ease-out', keyframes([
        style({
          opacity: 0,
          transform: 'translateY(80px)',
          offset: 0
        }),
        style({
          opacity: .4,
          transform: 'translateY(-5px)',
          offset: .6
        }),
        style({
          opacity: 1,
          transform: 'translateY(0px)',
          offset: 1
        })
      ]))
    ]),
    transition('selected => normal', [
      animate('750ms ease-out', keyframes([
        style({
          opacity: 1,
          transform: 'translateY(80px)',
          offset: 0
        }),
        style({
          opacity: 0,
          transform: 'translateY(2px)',
          offset: .2
        }),
        style({
          opacity: 1,
          transform: 'translateY(0px)',
          offset: 1
        })
      ]))
    ])
  ]);

export const floatElement =
  trigger('floatElement', [
    state('in', style({transform: 'translateY(0)'})),
    state('out', style({transform: 'translateY(0)'})),
    transition('in => out', [
      animate('2s ease-in', keyframes([
        style({
          opacity: 1,
          transform: 'translateY(0px)',
          offset: 0
        }),
        style({
          opacity: .8,
          transform: 'translateY(-5px)',
          offset: .3
        }),
        style({
          opacity: 1,
          transform: 'translateY(0px)',
          offset: 1
        })
      ]))
    ])
  ]);

export const beat =
  trigger('beat', [
    state('in', style({transform: 'translateY(0)'})),
    state('out', style({transform: 'translateY(0)'})),
    transition('in => out', [
      animate('1500ms ease-in', keyframes([
        style({
          opacity: .9,
          transform: 'translateY(0px) scale(1)',
          offset: 0
        }),
        style({
          opacity: .8,
          transform: 'translateY(-3px) scale(1.3)',
          color: '#FF9900',
          offset: .4
        }),
        style({
          opacity: .9,
          transform: 'translateY(-1px) scale(1.05)',
          offset: .8
        })
      ]))
    ])
  ]);

export const starsAnimated =
  trigger('starsAnimated', [
    state('normal', style({opacity: 1})),
    state('hover', style({opacity: 1, color: '#FF9900'})),
    transition('normal => hover', [
      query('#fullstarts',
        stagger('100ms', [
          animate('300ms ease-in', keyframes([
            style({
              opacity: 0,
              transform: 'translateY(-2px)',
              offset: 0
            }),
            style({
              opacity: .5,
              transform: 'translateY(2px)',
              color: '#FFC500',
              offset: .3
            }),
            style({
              opacity: .6,
              transform: 'translateY(0px)',
              color: '#FF9900',
              offset: .8
            })
          ]))
        ]), {optional: true})
    ])
  ]);

export const nameAnimated =
  trigger('nameAnimated', [
    state('normal', style({opacity: 1})),
    state('hover', style({opacity: 1, fontSize: '21px'})),
    transition('normal => hover', [
      query('#nombre-animado',
        stagger('50ms', [
          animate('200ms ease-in', keyframes([
            style({
              opacity: 0,
              fontSize: '22px',
              transform: 'translateY(-10px)',
              offset: .3
            }),
            style({
              opacity: .6,
              fontSize: '21px',
              offset: .8
            })
          ]))
        ]), {optional: true})
    ])
  ]);

export const itemsAnimated =
  trigger('itemsAnimated', [
    transition('* => *', [
      query(':enter',
        style({
          opacity: 0
        }), {optional: true}),
      query(':enter',
        stagger('200ms', [
          animate('800ms ease-in', keyframes([
            style({
              opacity: 0,
              transform: 'translateY(-55px)',
              offset: 0
            }),
            style({
              opacity: .25,
              transform: 'translateY(35px)',
              offset: .7
            }),
            style({
              opacity: 1,
              transform: 'translateY(0px)',
              offset: 1
            })
          ]))
        ]), {optional: true})
    ])
  ]);

export const timelineCard =
  trigger('timelineCard', [
    state('normal', style({
      transform: 'scale(1)'
    })),
    state('hover', style({
      transform: 'scale(1.05)',
      boxShadow: '0px 24px 41px 3px rgba(0,0,0,0.42)'
    })),
    state('modal', style({
      opacity: 0,
    })),
    transition('normal <=> hover', animate('200ms ease-out')),
    transition('* => modal', animate('100ms ease-in', keyframes([
      style({
        opacity: 1,
        transform: 'translateY(-100px)'
      }),
      style({
        transform: 'translateY(-500px)',
        opacity: 0,
      })
    ]))),
    transition('modal => normal', animate('250ms ease-in', keyframes([
      style({
        opacity: 0,
        transform: 'scale(2)',
        background: 'white',
        overflowY: 'hidden',
        offset: .1
      }),
      style({
        opacity: 0.3,
        overflow: 'hidden',
        transform: 'scale(1.5)',
        offset: .9
      }),
      style({
        opacity: 0.6,
        overflow: 'hidden',
        transform: 'scale(-.05)',
        offset: .95
      }),
      style({
        opacity: 1,
        overflow: 'hidden',
        transform: 'scale(1)',
        offset: 1
      })
    ])))
  ]);

export const timelinePhotoCard =
  trigger('timelinePhotoCard', [
    state('normal', style({
      transform: 'scale(1)'
    })),
    state('hover', style({
      transform: 'scale(1.15)',
    })),
    transition('normal <=> hover', animate('300ms ease-out'))
  ]);
