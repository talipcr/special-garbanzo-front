import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { count } from 'console';
import { element } from 'protractor';
import { ItemService } from './item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  itemId = '';
  result: any = null;
  error = false;
  success = false;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {}

  init(): void {
    this.result = null;
    this.error = false;
    this.success = false;
  }

  getAllItems(): void {
    this.init();

    this.itemService.getAllItems().subscribe(
      (res) => {
        this.result = res;
        this.success = true;
      },
      (err) => (this.error = true)
    );
  }

  getItemById(): void {
    this.init();

    if (this.itemId.length > 0) {
      this.itemService.getItemById(this.itemId).subscribe(
        (res) => {
          this.result = res;
          this.success = true;
        },
        (err) => (this.error = true)
      );
    } else {
      this.error = true;
    }
  }

  addItem(): void {
    this.init();

    const newItem = {
      name: 'Salad',
      price: 499,
      description: 'Fresh',
      image:
        'https://images.ctfassets.net/23aumh6u8s0i/5pnNAeu0kev0P5Neh9W0jj/5b62440be149d0c1a9cb84a255662205/whatabyte_salad-sm.png',
    };

    this.itemService.addItem(newItem).subscribe(
      (res) => {
        this.getAllItems();
      },
      (err) => (this.error = true)
    );
  }

  updateItemById(): void {
    this.init();

    const updateItem = {
      name: 'Spicy Pizza',
      price: 599,
      description: 'Blazing Good',
      image:
        'https://images.ctfassets.net/23aumh6u8s0i/2x1D2KeepKoZlsUq0SEsOu/bee61947ed648848e99c71ce22563849/whatabyte_pizza-sm.png',
    };

    if (this.itemId.length > 0) {
      this.itemService.updateItemById(this.itemId, updateItem).subscribe(
        (res) => {
          this.getItemById();
        },
        (err) => (this.error = true)
      );
    } else {
      this.error = true;
    }
  }

  deleteItemById(): void {
    this.init();

    if (this.itemId.length > 0) {
      this.itemService.deleteItemById(this.itemId).subscribe(
        (res) => {
          this.getAllItems();
        },
        (err) => (this.error = true)
      );
    } else {
      this.error = true;
    }
  }

  resetAllItem(): void {
    this.init();

    this.itemService.removeAll().subscribe(
      (res) => {
        this.getAllItems();
      },
      (err) => (this.error = true)
    );
  }
}
