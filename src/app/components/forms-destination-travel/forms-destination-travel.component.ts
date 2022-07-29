import { Component, EventEmitter, Inject, Injector, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { fromEvent, } from 'rxjs';
import { DestinationTravel } from '../../models/destination-travel.model';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { AppConfig, APP_CONFIG } from 'src/app/app.module';

@Component({
  selector: 'app-forms-destination-travel',
  templateUrl: './forms-destination-travel.component.html',
  styleUrls: ['./forms-destination-travel.component.css']
})
export class FormsDestinationTravelComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinationTravel>;
  fg: FormGroup;
  minLength = 3;
  searchResult;

  constructor(fb: FormBuilder, @Inject(forwardRef( () => APP_CONFIG)) private config: AppConfig) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      name: ['', Validators.compose([
        Validators.required,
        this.nameValidatorParameterizable(this.minLength)
      ])],
      url: ['']
    });

    this.fg.valueChanges.subscribe((form: any) => {
      console.log("cambio el formulario: ", form)
    })
  }

  ngOnInit(): void {
    const elemName = <HTMLInputElement>document.getElementById('name');
    fromEvent(elemName, 'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((text: string) => ajax(this.config.apiEndpoint + '/ciudades?q=' + text))
      ).subscribe(ajaxResponse => this.searchResult = ajaxResponse.response);
  }

  save(name: string, url:string):boolean {
    let d= new DestinationTravel(name, url);
    this.onItemAdded.emit(d);
    return false;
  }

  nameValidator(control: FormControl): { [s: string]: boolean } {
    let l = control.value.toString().trim().length;
    if (l > 0 && l < 5) {
      return { invalidName: true };
    }
    return null;
  }

  nameValidatorParameterizable(minLength: number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean} | null => {
      let l = control.value.toString().trim().length;
      if (l > 0 && l < minLength ) {
        return { iminLengthName: true };
      }
      return null;
    }
  }

}
