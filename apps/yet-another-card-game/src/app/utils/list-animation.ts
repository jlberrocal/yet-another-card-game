import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter', [
        style({
          opacity: 0,
          height: 0
        }),
        stagger('60ms',
          animate('200ms ease-out',
            style({
              opacity: 1,
              height: '*'
            })
          )
        )
      ],
      { optional: true }
    )

  ])
]);
