import { ElementRef, Type } from '@angular/core';

export function NativeElement<E extends HTMLElement, T extends Type<E>>(type : Type<E>): PropertyDecorator | MethodDecorator {
  return function Decorate<TC extends Function>(target: TC, key: string, descriptor?: PropertyDescriptor) {
    const overriddenDescriptor = {
      set: function (value: ElementRef) {
        if (!(value.nativeElement instanceof type)) {
          console.error('native element is not an instance of', type.name)
        } else {
          target[`__${key}`] = value.nativeElement;
          descriptor.set.apply(this, [value.nativeElement as E]);
        }
      },
      get() {
        return target[`__${key}`];
      },
    };
    if (descriptor) {
      return overriddenDescriptor
    } else {
      Object.defineProperty(target, key, overriddenDescriptor);
    }
  }
}
