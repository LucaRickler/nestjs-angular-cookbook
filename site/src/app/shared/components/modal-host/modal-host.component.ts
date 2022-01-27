import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackDirective } from '../../directives/modal-feedback/modal-feedback.directive';

@Component({
  selector: 'cookbook-modal-host',
  templateUrl: './modal-host.component.html',
  styleUrls: ['./modal-host.component.less']
})
export class ModalHostComponent implements OnInit {

  @ViewChild('content', {read: TemplateRef}) content!: TemplateRef<any>;

  modalRef!: NgbModalRef;

  @Input() title: string = '';

  @Input() saveEnabled: boolean = false;
  @Input() cancelEnabled: boolean = false;
  @Input() okEnabled: boolean = false;
  @Input() confirmEnabled: boolean = false;

  @ContentChild(ModalFeedbackDirective) feedback!: ModalFeedbackDirective<any>;

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  open(): NgbModalRef {
    this.modalRef = this.modalService.open(this.content);
    return this.modalRef;
  }

  save(): void {
    this.feedback.onClose().subscribe(res => {
      this.modalRef.close(res ?? {});
    });

  }

  dismiss(): void {
    this.modalRef.dismiss();
  }

  confirm(): void {
    this.modalRef.close(true);
  }

}
