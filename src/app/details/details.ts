import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.html',
  styleUrls: ['./details.css'],
})
export class Details implements OnInit {

  id: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
}