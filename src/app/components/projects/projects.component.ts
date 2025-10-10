import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Guitar E-Commerce',
      description: 'An Angular + Firebase shop with cart, admin panel, and live database.',
      image: 'assets/projectImgs/GshopImage.png',
      link: 'https://risingsondevguitarshop.web.app',
      github: 'https://github.com/RisingSonDev/GuitarShop'
    },
    {
      title: 'Unity 2D Platformer',
      description: 'A magical platformer game built for my daughter with C# and Unity.',
      image: 'assets/projects/platformer.png',
      link: '',
      github: 'https://github.com/your-username/platformer'
    },
    {
      title: 'Portfolio Website',
      description: 'This Angular site itself, deployed with Firebase Hosting.',
      image: 'assets/projects/portfolio.png',
      link: 'https://your-portfolio.com',
      github: 'https://github.com/your-username/portfolio'
    }
  ];
}
