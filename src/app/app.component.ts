import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Link {
  name?: string;      // nazwa linku/notatki
  url?: string;       // opcjonalny link zewnętrzny
  text?: string;      // opcjonalny tekst notatki
  show?: boolean;     // czy pokazać tekst
  protected?: boolean;// czy wymaga hasła
}

interface Item {
  title: string;
  show: boolean;
  type?: string;      // np. 'link'
  href?: string;      // zewnętrzny link dla typu link
  links?: Link[];     // lista linków/notatek
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Item[] = [

   { 
      title: '2025-10-01 Zadania Wspólnoty', 
      show: false,
      links: [
        {
          text: `Lider<br>
W parafii<br>
<b>📌 Kontakt z księdzem proboszczem/opiekunem</b><br>
- ustalenie współpracy i zgody na działania<br>
<b>🎵 Kontakt z organistą</b><br>
- kiedy posługujemy na wspólnych Mszach Św<br>
<b>📰 Przygotowywanie ogłoszeń parafialnych</b><br>
- przekazywanie księdzu (najpóźniej pt przed nd)<br>
<b>✝️ Zamawianie Mszy Św.</b><br><br>

Wspólnota:<br>
<b>💡 Odpowiedzialność za życie wspólnoty</b><br>
- przygotowanie planu formacyjno-ewangelizacyjnego<br>
- organizacja spotkań Rady Wspólnoty<br><br>

Na zewnątrz:<br>
<b>📱 Udział w grupie Liderów na Whatsappie</b><br>
- reagowanie na ustalenia<br>
<b>🧑‍🤝‍🧑 Kontakt z koordynatorem Odnowy</b><br><br>

Sfera osobista:<br>
<b>🙏 Modlitwa, formacja, rozwój duchowy</b>
`,
  show: false,
  //protected: true // dodajemy flagę chronionego tekstu
  protected: false // bez hasła
},
      ]
    },

 { 
      title: 'Krótkie filmiki', 
      show: false,
      links: [
        { name: 'Adoracja', url:'https://drive.google.com/file/d/19v9z69eTpJFXf2EoJhgi1T1E4Xpi4uZo/view?usp=sharing'},
        { name: 'Zawierzenie', url:'https://drive.google.com/file/d/1VJ9doPN3m7l8k2FH_-PpHtisKirPB2tj/view?usp=sharing'}
      ]
    },

    { title: 'aplikacja: ŻYCZENIA', 
      type: 'link', 
      href: 'https://bestwhishes.netlify.app/',
      show: false,
    }
        ];

    // hasło do odczytu chronionych podsumowań
  private readonly summaryPassword = 'syn';

  toggle(item: any) {
    item.show = !item.show;
  }

toggleLink(link: any) {
  // jeśli link jest chroniony
  if (link.protected) {
    if (!link.show) { // jeśli jeszcze nie odblokowany
      const password = prompt('Podaj hasło, aby odczytać podsumowanie:');
      if (password === this.summaryPassword) {
        link.show = true; // odblokowujemy
      } else {
        alert('Błędne hasło!');
      }
    }
  } else {
    // zwykłe działanie dla linków niechronionych
    link.show = !link.show;
  }
}


  trackByTitle(index: number, item: any) {
    return item.title;
  }

  trackByName(index: number, link: any) {
    return link.name;
  }

  closePage() {
  window.close();
}

}
