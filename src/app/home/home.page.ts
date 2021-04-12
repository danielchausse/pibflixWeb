import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AnimationController, AnimationDirection } from '@ionic/angular';

import { Animation } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

    @ViewChild('header') header: ElementRef;
    private headerEl: any;
    public stories: Array<any> = new Array<any>();
    public movies: Array<any> = new Array<any>();
    //public folder: string;   //essa classe tb estava aqui anteriormente
    public slidesOptions: any = { slidesPerView: 3, freeMode: true, spaceBetween: 10 };
    private lastScrollTop: number = 0;
    private animation: Animation;


    constructor(
      private http: HttpClient,
      private animationCtrl: AnimationController,
      private render: Renderer2
    ) {  }

    ngOnInit() {  }
    ionViewDidEnter() {
      this.headerEl = this.header.nativeElement;

      this.loadStories();
      this.loadMovies();
      this.createAnimation();
    }

    loadStories() {
      this.http.get('http://www.omdbapi.com/?apikey=66eb8945&s=net&page=1').subscribe(data => {
        const response: any = data;

        this.stories = response.Search;
      });
    }

    loadMovies() {
      this.http.get('http://www.omdbapi.com/?apikey=66eb8945&s=net&page=1').subscribe(data => {
        const response: any = data;

        this.movies = response.Search;
      });
    }
    createAnimation() {
      this.animation = this.animationCtrl.create()
      .addElement(this.headerEl)
      .duration(300)
      .direction('reverse')
      .fromTo('transform', 'translateY(0)', `translateY(-${this.headerEl.clientHeight}px)`);
    }

    onScroll(event: any) {
      const scrollTop: number = event.detail.scrollTop;
      const direction: AnimationDirection = scrollTop > this.lastScrollTop ? 'normal' : 'reverse';

      if(scrollTop > 50) { //numero 50 aqui mudar de acordo com o tamanho do nosso mesmo
        this.render.addClass(this.headerEl, 'dark');
      } else {
        this.render.removeClass(this.headerEl, 'dark');
      }

      if (this.animation.getDirection() != direction ) this.animation.direction(direction).play();

      this.lastScrollTop = scrollTop;
    }
  }


