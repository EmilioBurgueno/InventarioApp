import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from 'models/item.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {

  item: Item;
  
  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemService,
              private router: Router) { }

  ngOnInit() {
    const itemID = this.activatedRoute.snapshot.paramMap.get('itemId');
    this.getItem(itemID);
  }

  getItem(itemId: string) {
    this.itemService.getItem(itemId).subscribe((item) => {
      this.item=item;
      console.log(item);
    })
  }

}
