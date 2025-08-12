import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'OCP CR';

    async downloadReport() {
    try {
      // Replace with your actual report ID and authentication logic
      const reportId = 'YOUR_REPORT_ID';
      const accessToken = 'YOUR_ACCESS_TOKEN'; // Get this from your auth service
      
      const url = `https://api.powerbi.com/v1.0/myorg/reports/${reportId}/ExportTo`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'report.pbix'; // or appropriate file extension
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download error:', error);
    }
  }
}


