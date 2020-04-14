import { Component, OnInit ,Input} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsModule, FormControl, Validators } from '@angular/forms';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'models/item.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  @Input() iID: string;

  edititemForm: FormGroup;

  item: Item;

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private navParams: NavParams,
              private itemService: ItemService) { }

  ngOnInit() {
    const iID = this.navParams.get('iID');
    this.getItem(iID);
    this.initForm();
  }

  getItem(itemId: string) {
    this.itemService.getItem(itemId).subscribe((item) => {
      this.item=item;
      console.log(item);
      this.patchForm();
    })
  }

  updateItem() {
    const updatedItem = {
      ...this.edititemForm.value
    };

    this.itemService.updateItem(this.iID, updatedItem).then(() => {
      this.editAlert();
    }).catch((error) => {
      console.log(error)
    });
  }

  patchForm() {
    this.edititemForm.patchValue({
      name: this.item.name,
      description: this.item.description,
      price: this.item.price,
      category: this.item.category,
      availability: this.item.availability
    })
  }

  initForm() {
    this.edititemForm = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      description: new FormControl(null,[Validators.required]),
      price: new FormControl(null,[Validators.required]),
      category: new FormControl(null,[Validators.required]),
      availability: new FormControl(null,[Validators.required])
    });
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async editAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Success!',
      message: 'Your item has been updated successfully',
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
