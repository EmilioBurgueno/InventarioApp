import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ItemService } from 'src/app/services/item.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  additemForm: FormGroup;

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private itemService: ItemService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.additemForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required])
    });
  }
  
  addItem(): void{
    if(this.additemForm.valid) {
      const descform = this.additemForm.controls.description.value;
      const nameform = this.additemForm.controls.name.value;
      const priceform = this.additemForm.controls.price.value;
      const categoryform = this.additemForm.controls.category.value;

      const item = {
        name: nameform,
        description: descform,
        price: priceform,
        category: categoryform,
        availability: 'available'
      };

      this.itemService.addItem(item).then(() => {
        this.addAlert()
      }).catch((error) => {
        console.log(error)
      });
    }
    else{
      console.log('Error')
    }
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async addAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Success!',
      message: 'Your item has been created succesfully',
      buttons: [
        {
          text: 'OKAY',
          handler: () => {
            this.closeModal();
          }
        }
      ]
    });
    
    await alert.present();
  }
}
