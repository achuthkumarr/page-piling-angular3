// page-piling.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

interface Section {
  id: number;
  value: string;
}

interface Statistic {
  value: string;
  label: string;
}

@Component({
  selector: 'app-page-piling',
  templateUrl: './page-piling.component.html',
  styleUrls: ['./page-piling.component.scss']
})
export class PagePilingComponent implements OnInit {
  sections: Section[] = [
    { id: 1, value: 'Home' },
    { id: 2, value: 'Our Approach' },
    { id: 3, value: 'Collaboration' },
    { id: 4, value: 'Tracks' }
  ];
  
  statistics: Statistic[] = [
    { value: '8+', label: 'Years Engagements' },
    { value: '10+', label: 'Ideation to Growth' },
    { value: '6+', label: 'GCC\'s Spin-Off' },
    { value: '4+', label: 'Intrapreneurship Engagements' }
  ];
  
  currentYear: number = new Date().getFullYear();
  currentSection: number = 1;
  isScrolling: boolean = false;
  
  constructor(private dialog: MatDialog) {}
  
  ngOnInit(): void {
    // Initialize scroll position to first section
    this.scrollToSection(1);
    
    // Add scroll indicator for users
    this.addScrollIndicator();
  }
  
  scrollToSpecificSection(sectionId: number): void {
    this.currentSection = sectionId;
    const element = document.getElementById('section' + sectionId);
    
    if (element) {
      this.isScrolling = true;
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Reset scrolling flag after animation completes
      setTimeout(() => {
        this.isScrolling = false;
      }, 1000);
    }
  }
  
  scrollToSection(sectionId: number): void {
    this.scrollToSpecificSection(sectionId);
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (!this.isScrolling) {
      // Determine which section is currently in view
      for (let i = 1; i <= this.sections.length; i++) {
        const element = document.getElementById('section' + i);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -300 && rect.top <= 300) {
            this.currentSection = i;
            break;
          }
        }
      }
    }
  }
  
  contactUs(): void {
    // Implement contact functionality or navigate to contact page
    console.log('Contact Us clicked');
    // Example: this.router.navigate(['/contact']);
  }
  
  openDialog(type: string): void {
    // Implement dialog opening based on type
    console.log(`Opening ${type} dialog`);
    // Example:
    // this.dialog.open(DialogComponent, {
    //   data: { type: type },
    //   width: '600px'
    // });
  }
  
  private addScrollIndicator(): void {
    // Create and add scroll indicator to show users they can scroll
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = `
      <div class="scroll-arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    
    // Add styles for the scroll indicator
    const style = document.createElement('style');
    style.textContent = `
      .scroll-indicator {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        opacity: 0.7;
        animation: fadeInOut 2s infinite;
      }
      
      .scroll-arrow {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .scroll-arrow span {
        display: block;
        width: 20px;
        height: 20px;
        border-bottom: 2px solid #3366cc;
        border-right: 2px solid #3366cc;
        transform: rotate(45deg);
        margin: -10px;
        animation: scrollAnimation 2s infinite;
      }
      
      .scroll-arrow span:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .scroll-arrow span:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes scrollAnimation {
        0% {
          opacity: 0;
          transform: rotate(45deg) translate(-20px, -20px);
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          transform: rotate(45deg) translate(20px, 20px);
        }
      }
      
      @keyframes fadeInOut {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(indicator);
    
    // Remove indicator after user's first scroll
    const removeIndicator = () => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
        window.removeEventListener('scroll', removeIndicator);
      }
    };
    
    window.addEventListener('scroll', removeIndicator);
  }
}