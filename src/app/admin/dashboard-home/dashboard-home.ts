import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardStatistiqueDto } from '../../dto/dashboard-statistique.dto';
import { DashboardService } from '../../services/dashboard-service';


@Component({
  selector: 'app-dashboard-home',
  imports: [],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
})

export class DashboardHome implements OnInit {

  statistiques = new DashboardStatistiqueDto();

    


  constructor(private dashboardService: DashboardService,  private cd: ChangeDetectorRef
) {}

  ngOnInit(): void {

  console.log("INIT Dashboard");

  this.dashboardService.statistiques().subscribe(data => {

    console.log("Avant affectation", this.statistiques);

    this.statistiques = data;

    console.log("Après affectation", this.statistiques);
         this.cd.detectChanges();

    
  });

}
    

}