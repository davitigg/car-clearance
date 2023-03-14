import { Component, ElementRef, HostListener } from '@angular/core';
import { CarModel } from '../car-model';
import { LevyService } from '../levy.service';
import { ResponseModel } from '../response-model';

@Component({
  selector: 'app-car-clearance',
  templateUrl: './car-clearance.component.html',
  styleUrls: ['./car-clearance.component.css'],
})
export class CarClearanceComponent {
  model: CarModel = {
    hybrid: false,
    electric: false,
    rightWheelOrMoved: false,
    year: undefined,
    engine: 1.2,
  };

  responseModel?: ResponseModel;

  productionYears: any;
  calculatorsMenu: Record<string, boolean> = {
    importTax: false,
    carLevy: true,
    service: false,
  };
  year: any = '1965 - 23';
  yearSelectMenu = false;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    let element = event.target as HTMLElement;
    if (!element.className.includes('select')) this.yearSelectMenu = false;
  }

  constructor(private eRef: ElementRef, private levyService: LevyService) {
    this.productionYears = Array(59)
      .fill(1)
      .map((x, i) => i + 1965); // [0,1,2,3,4]
  }

  ngOnInit() {}

  calculatorsMenuClick(str: string) {
    for (let key in this.calculatorsMenu) {
      if (str == key) {
        this.calculatorsMenu[key] = true;
      } else {
        this.calculatorsMenu[key] = false;
      }
    }
  }

  yearSelectMenuClick() {
    this.yearSelectMenu = !this.yearSelectMenu;
  }

  selectYear(year: number) {
    this.model.year = year;
    this.year = year;
    this.yearSelectMenu = false;
  }

  getSliderStyle() {
    let value = ((this.model.engine - 0.1) / 6.4) * 100;
    return {
      background: `linear-gradient(to right, #d1e4ff 0%, #d1e4ff ${value}%, #f1f3f6 ${value}%, #f1f3f6 100%)`,
    };
  }

  getEngineInputStyle() {
    if (this.model.engine >= 0.1 && this.model.engine <= 6.5) {
      let value1 = (this.model.engine - 0.1) / 6.4;
      let value2 = (1 - value1 * 2) * 42;
      return {
        'margin-left': `calc(${value1 * 100}% - 18px + ${value2}px`,
      };
    } else if (this.model.engine == null) {
      return {
        'margin-left': 'calc(50% - 18px)',
      };
    } else return;
  }

  engineInput(event: any) {
    if (this.model.engine != null && this.model.engine.toString().length > 3) {
      this.model.engine = Number(this.model.engine.toFixed(1));
      event.target.value = Number(this.model.engine.toFixed(1));
    }
    if (this.model.engine > 6.5) this.model.engine = 6.5;
    if (this.model.engine < 0) this.model.engine = 0.1;
  }

  yearInput(event: any) {
    if (
      (this.model.year != null && this.model.year.toString().length > 4) ||
      this.model.year! > 2023
    ) {
      this.model.year = 2023;
      event.target.value = 2023;
    }
  }

  submit() {
    this.levyService.calculateLevy(this.model).subscribe({
      next: (res) => {
        this.responseModel = res as ResponseModel;
      },
      error: (err) => {
        this.responseModel = undefined;
      },
    });
  }
}
