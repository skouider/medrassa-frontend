import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from "@angular/common";
import { SessionService } from '../../../services/session.service';
import { SessionOuvertureDTO } from '../../../dto/session-response.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-session-list',
  imports: [CommonModule],
  templateUrl: './session-list.html',
  styleUrl: './session-list.css',
})
export class SessionList implements OnInit{


  sessions$!: Observable<SessionOuvertureDTO[]>;

 _sesisons: SessionOuvertureDTO[] = []
 selectedSessionId?:number

  constructor(private sessionService:SessionService){
    this.sessions$ = sessionService.sessions$
  }
  ngOnInit(): void {
    this.loadSessions()
  }

  loadSessions(){
    this.sessionService.loadSessions()
  }

  
    _selectedSession(s:SessionOuvertureDTO){
      
     this.currentSession = s
     if(s.configurations != null){

       this.sessionService.typesSelectionnes = s.configurations 
     }else{
      this.sessionService.typesSelectionnes = [] 
     }
    
     
   }
   public get currentSession(){
    return this.sessionService.currentSession
   }
  set currentSession(value: SessionOuvertureDTO) {
  this.sessionService.currentSession = value;
}

}
