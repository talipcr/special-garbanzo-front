import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ItemService } from './item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  itemId = '';
  result = null;
  error = false;
  success = false;

  constructor(
    private itemService: ItemService,
    private authService: AuthService,
    private router: Router
  ) {}

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

    const newItem: any = {
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

    const updateItem: any = {
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

  async logout(): Promise<void> {
    localStorage.removeItem('currentUser.uid');
    localStorage.removeItem('currentUser.accessToken');
    localStorage.removeItem('currentUser.refreshToken');

    await this.router.navigate(['/auth']);
  }
}
