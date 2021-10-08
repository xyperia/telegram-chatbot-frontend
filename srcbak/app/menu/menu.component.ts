import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MenuService } from './menu.service';
import { MenuEntity } from '../entity/menu.entity';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuDetailService } from './menu-detail.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { DeleteConfirmComponent } from '../shared/delete-confirm/delete-confirm.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MenuComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  displayedColumns = ['ID', 'TITLE', 'KEYWORD'];
  txSearch: string = "";
  dataSource;
  expandedElement = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service:MenuService,
    public dialog:MatDialog,
    private _snackBar: MatSnackBar,
    private router:Router
  ) { }

  ngOnInit() {
    this.getMenu();
  }

  dialogView(entity: any) {
    const dialogRef = this.dialog.open(MenuDetailComponent, {
      width: '60%',
      data: entity
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.refresh();
      }     
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getMenu(){
    this.subs.add(this.service.getMenu().subscribe(
      res=>{
        this.dataSource = new MatTableDataSource<MenuEntity>(res);
        this.dataSource.paginator = this.paginator;
      }
    ));
  }

  confirmDelete(menu_id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      data: {id: menu_id, isDelete: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.subs.add(this.service.deleteMenu(menu_id).subscribe(res => { this.refresh() }));
      }
    });
    
  }

  refresh(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/menu']);
    });
  }

  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }
}

//DIALOG COMPONENT
@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html'
})
export class MenuDetailComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  isUpdate: boolean = false;
  isSave: boolean = false;

  fTitle = new FormControl('', [Validators.required, Validators.minLength(5)]);
  fKeyword = new FormControl('', [Validators.required]);
  fContent = new FormControl('', [Validators.required, Validators.minLength(5)]);

  arrData: MenuEntity[] = [];
  fieldId: string;
  fieldTitle: string;
  fieldContent: string;
  fieldKeyword: string;
  fieldIsMainMenu: number = 1;
  fieldIsLastMenu: number = 0;
  fieldIsEnabled: number = 1;

  tipTitle: string = "Title is only visible in Main Menu";
  tipKeyword: string = "Bot will send the message content based on keyword";
  tipContent: string = "Bot will send this content as a body of the message";
  tipMainMenu: string = "If Main Menu is turned on, this menu will be shown in the main menu";
  tipLastMenu: string = "If Last Menu is turned on, then bot will recognized this as last menu and will send message \"Back To Menu\"";
  tipIsEnabled: string = "Set visibility for this menu. If this turned off, then bot won't send this menu to user"

  Object = Object;
  constructor(
    private router:Router,
    private service: MenuDetailService,
    public dialogRef: MatDialogRef<MenuDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.fieldId = this.data.ID;
      this.fieldTitle = this.data.TITLE;
      this.fieldContent = this.data.CONTENT;
      this.fieldKeyword = this.data.KEYWORD;
      this.fieldIsMainMenu = this.data.IS_MAINMENU;
      this.fieldIsLastMenu = this.data.IS_LASTMENU;
      this.fieldIsEnabled = this.data.IS_ENABLED;
    } else {
      this.isUpdate = true;
    }
  }

  formCheck(){
    if(!this.fTitle.invalid && !this.fKeyword.invalid && !this.fContent.invalid){
      this.isSave = true;
    } else {
      this.fTitle.markAsTouched();
      this.fKeyword.markAsTouched();
      this.fContent.markAsTouched();
    }
  }

  getErrorMessage(controlName: any) {
    if (controlName.hasError('required')) {
      return 'You must enter a value';
    }
    return 'Length at least ' + controlName.errors.minlength.requiredLength + ' characters';
  }

  save(){
    
      this.isSave = false;
      var dt = new Date(Date.now());
      if(!this.fieldId){
        this.fieldId = 'VTI/BOT/' + dt.getTime().toString()
      }
      this.arrData = [{
        ID: this.fieldId,
        TITLE: this.fieldTitle,
        CONTENT: this.fieldContent,
        KEYWORD: this.fieldKeyword,
        IS_MAINMENU: this.fieldIsMainMenu,
        IS_LASTMENU: this.fieldIsLastMenu,
        IS_ENABLED: this.fieldIsEnabled,
        VISITOR: 0
      }];

      if(this.data){ // UPDATE MENU
        try {
          this.subs.add(this.service.updateMenu(this.arrData[0]).subscribe(res => { this.dialogRef.close(true) }));
        } catch (error) {
          console.log(error);
        }
      } else { // INSERT MENU
        try {
          this.subs.add(this.service.createMenu(this.arrData[0]).subscribe(res => { this.dialogRef.close(true) }));
        } catch (error) {
          console.log(error);
        }
      }
    
  }

  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }
}