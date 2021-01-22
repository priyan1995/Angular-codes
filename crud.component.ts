import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MarksSheetService } from 'src/app/admin/_services/evaluation-section/marks-sheet/marks-sheet.service';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  animations: [SharedAnimations]
})
export class ViewComponent implements OnInit {

  sections = [];


  mark_sheet_id: number;

  constructor(
    private route: ActivatedRoute,
    private marksSheetService: MarksSheetService,
    private toastr: ToastrService,
    public translateService: TranslateService
  ) { }



  ngOnInit() {


    this.route.paramMap.subscribe(params => {
      const markSheetId = +params.get('id');
      if (markSheetId) {
        this.mark_sheet_id = markSheetId;

        this.marksSheetService.getMark(this.mark_sheet_id).subscribe(res => {
          // console.log(res['mark_sheet']);
          this.sections = res['mark_sheet'];
          // console.log(this.sections);
        }, err => {
          console.log(err);
        });




      }
    });


    let marksTotal = 0;
    let questionTotal = 0;
    let marksAverage = 0;

    this.sections.forEach(section => {

      questionTotal = 0;
      marksTotal = 0;

      section.questions.forEach(question => {

        marksTotal = marksTotal + question.marks;
        questionTotal = questionTotal + 1;

      });

      marksAverage = (marksTotal / (questionTotal * 10)) * 100;
      section.total_marks = Math.round(marksAverage);

    });

  }


  changeValue(section_index, question_index, event) {

    this.sections[section_index].questions[question_index].marks = Number(event.target.value);

  }


  getAverageMarks(section_index) {

    let totalMarks = 0;
    let totalQuestions = 0;
    let averageMark = 0;

    this.sections[section_index].questions.forEach(question => {
      totalMarks = totalMarks + question.marks;
      totalQuestions = totalQuestions + 1;
    });


    averageMark = (totalMarks / (totalQuestions * 10)) * 100;

    this.sections[section_index].total_marks = Math.round(averageMark);

    this.updateMarks();
  }

  updateMarks() {
    this.marksSheetService.editMark(this.mark_sheet_id, this.sections).subscribe(res => {
      if (res) {
        // console.log(res);
        this.toastr.success(`${this.translateService.instant('Marks updated')}`,`${this.translateService.instant('common.success')}`, {progressBar: true});
      }
    },
      err => {
        console.log(err);
      }
    )
  }

}
