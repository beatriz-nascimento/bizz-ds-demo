// Register all bizz-components custom elements once at entry
import 'bizz-components/web';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch(console.error);
