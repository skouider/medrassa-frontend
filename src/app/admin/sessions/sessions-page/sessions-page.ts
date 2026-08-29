import { Component } from '@angular/core';
import { SessionForm } from "../session-form/session-form";
import { SessionList } from "../session-list/session-list";

@Component({
  selector: 'app-sessions-page',
  imports: [SessionForm, SessionList],
  templateUrl: './sessions-page.html',
  styleUrl: './sessions-page.css',
})
export class SessionsPage {}
