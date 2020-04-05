import { finalize } from 'rxjs/operators';
import { UiService } from '../services/ui.service';

export const hideSpinner = (service: UiService) => source => source.pipe(
  finalize(() => service.hideSpinner())
);
