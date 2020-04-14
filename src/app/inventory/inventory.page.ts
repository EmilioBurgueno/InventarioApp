import { Component, OnInit } from '@angular/core';
import { Item } from 'models/item.model';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ItemService } from '../services/item.service';
import { AddPage } from '../modals/add/add.page';
import { EditPage } from '../modals/edit/edit.page';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  viewMode = "Ava";

  Items: Item[] = [];

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private itemService: ItemService
  ) {}

  ngOnInit() {
   this.getItems();
  }

  //Modal
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddPage
    });
    return await modal.present();
  }

  async openModalEdit(itemId: string) {
    const modal = await this.modalCtrl.create({
      component: EditPage,
      componentProps: {
        iID: itemId
      }
    });
    return await modal.present();
  }

  // funciones

  getItems() {
    this.itemService.getItems().subscribe(items => {
      this.Items = items;
    });
  }

  async Alert() {
    const alert = await this.alertCtrl.create({
      header: "Success!",
      message: "Your item has been deleted succesfully",
      buttons: ["OKAY"]
    });
    await alert.present();
  }

  deleteItem(itemId: string) {
    this.itemService
      .deleteItem(itemId)
      .then(() => {
        this.Alert();
      })
      .catch(error => {
        console.log(error);
      });
  }

  changeStatus(itemId: string, itemDes: string, itemAva: string, itemName: string, itemPrice: string, itemCat: string) {
    if (itemAva === "available") {
      itemAva = "unavailable";
    } else {
      itemAva = "available";
    }
    const updatedItem = {
      name: itemName,
      description: itemDes,
      price: itemPrice,
      category: itemCat,
      availability: itemAva
    };
    this.itemService
      .updateItem(itemId, updatedItem)
      .then(() => {
        console.log("Status Changed");
      })
      .catch(error => {
        console.log(error);
      });
  }

  itemDescription(itemId: string){
    this.navCtrl.navigateForward(['description', itemId])
  }

  openHome(){
    this.navCtrl.navigateRoot(['home']);
  }

}
