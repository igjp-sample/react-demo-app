import * as React from "react";
import './ExcelLikeGridStyles.css';

import { withTranslation, useTranslation } from 'react-i18next';
import { DataGridSharedData } from "./DataGridSharedData";

import {
    FilterFactory
} from 'igniteui-react-core';

import {
    IgrColumnSummaryDescription,
    IgrDataGridModule,
    IgrTextColumn,
    IgrDataGrid,
    IgrGridSelectedItemsChangedEventArgs,
    IgrImageColumn,
    IgrNumericColumn,
    IgrDateTimeColumn,
    IgrGridCellEventArgs
} from 'igniteui-react-grids';

import { EnterKeyBehaviors } from "igniteui-react-grids";
import { EnterKeyBehaviorAfterEdit } from "igniteui-react-grids";

import { defineCustomElements } from "@infragistics/igniteui-dockmanager/loader";
import TextField from '@material-ui/core/TextField';

IgrDataGridModule.register();

class ExcelLikeGrid extends React.Component<any, any> {

    private studentsDatabase: any[];

    public grid: IgrDataGrid;

    public dataBind: boolean = false;

    private currentYear = new Date().getFullYear();
    private previousYear =  this.currentYear - 1;

    constructor(props: any) {
        super(props);

        this.gridRef = this.gridRef.bind(this);
        this.onGridSearchChanged = this.onGridSearchChanged.bind(this);

        // DataGridSharedData.getStudents(60,this.props.i18n.language).then(res => {
        //     this.studentsDatabase = res;
        //     console.log(res)
        // })

    }

    public render(): JSX.Element {
        const { t } = this.props;
        return (
            <div className="igContainer">
                <div>
                    <TextField style={{ marginBottom: "10px", width: "100%"}}
                    id="standard-search"
                    label={t('Search by Name/ID')}
                    type="search"
                    className="searchField"
                    onChange={this.onGridSearchChanged}/>
                </div>
                <IgrDataGrid
                    height="100%"
                    width="100%"
                    ref={this.gridRef}
                    summaryScope="Both"
          groupSummaryDisplayMode="RowBottom"
          enterBehavior="Edit"
          enterBehaviorAfterEdit="MoveDown"
          autoGenerateColumns="false"
          isColumnOptionsEnabled="true"
          selectionMode="RangeCell">
                        <IgrImageColumn field="Photo" headerText="Photo" contentOpacity="1"
                    horizontalAlignment="stretch" width="110" paddingTop="5" paddingBottom="5"  paddingRight="10"/>
                    <IgrTextColumn field="Name" width="*>140"/>


                    <IgrNumericColumn field="Salary" positivePrefix="$"
                    showGroupingSeparator="true" width="*>160"/>

                    <IgrDateTimeColumn field="Birthday" headerText="Date of Birth"
                    horizontalAlignment="stretch" width="*>160" paddingRight="10"/>
                    <IgrTextColumn field="Country" headerText="国籍" width="*>130" horizontalAlignment="center"/>

                    <IgrTextColumn field="Income" width="*>130" horizontalAlignment="center"/>
                    <IgrTextColumn field="Age" width="*>110" horizontalAlignment="center"/>
                </IgrDataGrid>
            </div>
        );
    }

    public gridRef(grid: IgrDataGrid) {
        console.log(0)

        if (!grid) { return; }
        this.grid = grid;
        this.onReady();
    }

    private onReady() {
        if (this.dataBind === false) {
            DataGridSharedData.getEmployees(5000,this.props.i18n.language).then(res => {
            console.log(123)

                this.grid.dataSource = res;
                this.dataBind = true;
            })
        }
    }

    public onGridSearchChanged(event: any) {
        let term = event.target.value;
        if (!this.grid) {
            return;
        }
        if (!term || term.length === 0) {
            this.grid.filterExpressions.clear();
        } else {
            let ff = FilterFactory.instance;
            let filter = ff.property("ID").toLower().contains(ff.literal(term).toLower())
                .or(ff.property("Name").toLower().contains(ff.literal(term).toLower()));
            this.grid.filterExpressions.clear();
            this.grid.filterExpressions.add(filter);
        }
    }

}
export default withTranslation()(ExcelLikeGrid)