import * as React from "react";
import './DockManagerStyles.css';

import { withTranslation, useTranslation } from 'react-i18next';
import { DockManagerSharedData } from "./DockManagerSharedData";

import {
    SummaryOperand,
    SummaryCalculator,
    DefaultSummaryResult,
    IDataSource,
    ISummaryResult,
    FilterFactory,
    IgrProvideCalculatorEventArgs
} from 'igniteui-react-core';

import {
    IgrColumnSummaryDescription,
    IgrDataGridModule,
    IgrTextColumn,
    IgrDataGrid,
    IgrGridSelectedItemsChangedEventArgs
} from 'igniteui-react-grids';

// axis modules:
import {
    IgrCategoryAngleAxis,
    IgrStackedFragmentSeries,
    IgrNumericRadiusAxis,
    IgrRadialLineSeries,
    IgrStackedColumnSeries,
    IgrDataChartRadialCoreModule,
    IgrDataChartRadialModule,
    IgrDataChartInteractivityModule,
    IgrLegendModule,
    IgrNumericYAxis,
    IgrCategoryXAxis,
    IgrColumnSeries,
    IgrDataChart,
    IgrDataChartCoreModule,
    IgrDataChartCategoryModule,
    IgrLegend,
    IgrDataChartStackedModule
} from 'igniteui-react-charts';

import {
    IgcDockManagerComponent,
    IgcContentPane,
    IgcDockManagerPaneType,
    IgcSplitPaneOrientation
} from "@infragistics/igniteui-dockmanager";

import { defineCustomElements } from "@infragistics/igniteui-dockmanager/loader";
import TextField from '@material-ui/core/TextField';

/* eslint-disable */
declare global {
    namespace JSX {
        // tslint:disable-next-line:interface-name
        interface IntrinsicElements {
            "igc-dockmanager": any;
        }
    }
}
/* eslint-enable */

defineCustomElements();

IgrDataGridModule.register();
IgrDataChartRadialCoreModule.register();
IgrDataChartRadialModule.register();
IgrDataChartInteractivityModule.register();
IgrLegendModule.register();
IgrDataChartCoreModule.register();
IgrDataChartCategoryModule.register();
IgrDataChartInteractivityModule.register();
IgrDataChartStackedModule.register();

class DockManagerUpdatingPanes extends React.Component<any, any> {

    private dockManager: IgcDockManagerComponent;
    private studentsDatabase: any[];

    public grid: IgrDataGrid;
    public studentsGrid: IgrDataGrid;

    private resultViewContainer: HTMLDivElement;
    private studentsGridContainer: HTMLDivElement;
    private studentsGridPane: IgcContentPane;
    private resultGridContainer: HTMLDivElement;
    private resultGridPane: IgcContentPane;
    private studentsListPane: IgcContentPane;
    private barChart: IgrDataChart;
    private barChartPane: IgcContentPane;
    private barChartContainer: HTMLDivElement;
    private barChartLegend: IgrLegend;
    private barChartSub1: IgrDataChart;
    private barChartSub1Pane: IgcContentPane;
    private barChartSub1Container: HTMLDivElement;
    private barChartSub2: IgrDataChart;
    private barChartSub2Pane: IgcContentPane;
    private barChartSub2Container: HTMLDivElement;
    private barChartSub3: IgrDataChart;
    private barChartSub3Pane: IgcContentPane;
    private barChartSub3Container: HTMLDivElement;
    private barChartSub4: IgrDataChart;
    private barChartSub4Pane: IgcContentPane;
    private barChartSub4Container: HTMLDivElement;
    private barChartSub5: IgrDataChart;
    private barChartSub5Pane: IgcContentPane;
    private barChartSub5Container: HTMLDivElement;
    private radialChart: IgrDataChart;
    private radialChartPane: IgcContentPane;
    private radialChartContainer: HTMLDivElement;

    private currentYear = new Date().getFullYear();
    private previousYear =  this.currentYear - 1;

    constructor(props: any) {
        super(props);

        this.gridRef = this.gridRef.bind(this);
        this.studentsGridRef = this.studentsGridRef.bind(this);
        this.barChartRef = this.barChartRef.bind(this);
        this.barChartLegendRef = this.barChartLegendRef.bind(this);
        this.barChartSub1Ref = this.barChartSub1Ref.bind(this);
        this.barChartSub2Ref = this.barChartSub2Ref.bind(this);
        this.barChartSub3Ref = this.barChartSub3Ref.bind(this);
        this.barChartSub4Ref = this.barChartSub4Ref.bind(this);
        this.barChartSub5Ref = this.barChartSub5Ref.bind(this);
        this.radialChartRef = this.radialChartRef.bind(this);
        this.onGridSearchChanged = this.onGridSearchChanged.bind(this);

        DockManagerSharedData.getStudents(60,this.props.i18n.language).then(res => {
            this.studentsDatabase = res;
            this.onReady();
        })

        this.state = {
            "ID" : "",
            "Name" : "",
            "ClassNumber" : "",
        }
    }

    public render(): JSX.Element {
        const { t } = this.props;
        return (
            <div className="igContainer">
                <igc-dockmanager id="dockManager">
                    <div
                        className="dockManagerContent"
                        slot="resultViewContainer"
                        id="resultViewContainer"/>
                    <div
                        className="dockManagerContent"
                        slot="studentsGridContainer"
                        id="studentsGridContainer">
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
                                editMode="None"
                                selectionMode="SingleRow"
                                ref={this.studentsGridRef}
                                selectedItemsChanged={this.selectedItemsChanged}
                                dataSource={this.studentsDatabase}
                                activationMode="None"
                                useAccessibility="true"
                                autoGenerateColumns="false">
                                <IgrTextColumn borderRightWidth="1" border="#dddddd" field="ID" headerText={t('ID Number')} />
                                <IgrTextColumn borderRightWidth="1" border="#dddddd" field="ClassNumber" headerText={t('Classroom')} />
                                <IgrTextColumn field="Name" headerText={t('Name')} />
                            </IgrDataGrid>
                    </div>
                    <div
                        className="dockManagerContent"
                        slot="barChartContainer"
                        id="barChartContainer">
                            <div className="igOptions-horizontal">
                                <div className="igLegend">
                                    <IgrLegend ref={this.barChartLegendRef} orientation="Horizontal" />
                                </div>
                            </div>
                            <div className="igComponent" style={{ height: "calc(100% - 35px)" }} >
                            <IgrDataChart
                                    width="100%"
                                    height="100%"
                                    ref={this.barChartRef}
                                    isHorizontalZoomEnabled={true}
                                    isVerticalZoomEnabled={true} >
                                    <IgrCategoryXAxis name="xAxis" label="Month" interval="1"
                                        title={t('Implementation Month')} />
                                    <IgrNumericYAxis name="yAxis" minimumValue={0} maximumValue={500}
                                        title={t('Score')} />
                                    <IgrStackedColumnSeries radiusX={0} radiusY={0} name="series" xAxisName="xAxis" yAxisName="yAxis">
                                        <IgrStackedFragmentSeries outline="transparent" brush="#e57373" name="series1" valueMemberPath="Subject1" title={t('school.subject1')} />
                                        <IgrStackedFragmentSeries outline="transparent" brush="#ba68c8" name="series2" valueMemberPath="Subject2" title={t('school.subject2')} />
                                        <IgrStackedFragmentSeries outline="transparent" brush="#64b5f6" name="series3" valueMemberPath="Subject3" title={t('school.subject3')} />
                                        <IgrStackedFragmentSeries outline="transparent" brush="#4db6ac" name="series4" valueMemberPath="Subject4" title={t('school.subject4')} />
                                        <IgrStackedFragmentSeries outline="transparent" brush="#ffd54f" name="series5" valueMemberPath="Subject5" title={t('school.subject5')} />
                                    </IgrStackedColumnSeries>
                                </IgrDataChart>
                            </div>
                    </div>
                    <div
                        className="dockManagerContent"
                        slot="barChartSub1Container"
                        id="barChartSub1Container">
                            <div className="igComponent" >
                            <IgrDataChart
                                    width="100%"
                                    height="100%"
                                    ref={this.barChartSub1Ref}
                                    isHorizontalZoomEnabled={true}
                                    isVerticalZoomEnabled={true} >
                                    <IgrCategoryXAxis name="xAxis" label="Month" interval="1"
                                        title={t('Implementation Month')} />
                                    <IgrNumericYAxis name="yAxis" minimumValue={0} maximumValue={100}
                                        title={t('Score')} />
                                    <IgrColumnSeries
                                     outline="transparent" brush="#e57373"
                                    name="series1"
                                    xAxisName="xAxis"
                                    yAxisName="yAxis"
                                    valueMemberPath="Subject1" />
                                </IgrDataChart>
                            </div>
                    </div>
                    <div
                        className="dockManagerContent"
                        slot="barChartSub2Container"
                        id="barChartSub2Container">
                            <div className="igComponent" >
                            <IgrDataChart
                                    width="100%"
                                    height="100%"
                                    ref={this.barChartSub2Ref}
                                    isHorizontalZoomEnabled={true}
                                    isVerticalZoomEnabled={true} >
                                    <IgrCategoryXAxis name="xAxis" label="Month" interval="1"
                                        title={t('Implementation Month')} />
                                    <IgrNumericYAxis name="yAxis" minimumValue={0} maximumValue={100}
                                        title={t('Score')} />
                                    <IgrColumnSeries
                                    outline="transparent" brush="#ba68c8"
                                    name="series2"
                                    xAxisName="xAxis"
                                    yAxisName="yAxis"
                                    valueMemberPath="Subject2" />
                                </IgrDataChart>
                            </div>
                    </div>
                    <div
                        className="dockManagerContent"
                        slot="barChartSub3Container"
                        id="barChartSub3Container">
                            <div className="igComponent" >
                            <IgrDataChart
                                    width="100%"
                                    height="100%"
                                    ref={this.barChartSub3Ref}
                                    isHorizontalZoomEnabled={true}
                                    isVerticalZoomEnabled={true} >
                                    <IgrCategoryXAxis name="xAxis" label="Month" interval="1"
                                        title={t('Implementation Month')} />
                                    <IgrNumericYAxis name="yAxis" minimumValue={0} maximumValue={100}
                                        title={t('Score')} />
                                    <IgrColumnSeries
                                    name="series3"
                                    xAxisName="xAxis"
                                    yAxisName="yAxis"
                                    outline="transparent" brush="#64b5f6"
                                    valueMemberPath="Subject3" />
                                </IgrDataChart>
                            </div>
                    </div>
                    <div
                        className="dockManagerContent"
                        slot="barChartSub4Container"
                        id="barChartSub4Container">
                            <div className="igComponent" >
                            <IgrDataChart
                                    width="100%"
                                    height="100%"
                                    ref={this.barChartSub4Ref}
                                    isHorizontalZoomEnabled={true}
                                    isVerticalZoomEnabled={true} >
                                    <IgrCategoryXAxis name="xAxis" label="Month" interval="1"
                                        title={t('Implementation Month')} />
                                    <IgrNumericYAxis name="yAxis" minimumValue={0} maximumValue={100}
                                        title={t('Score')} />
                                    <IgrColumnSeries
                                    name="series4"
                                    outline="transparent" brush="#4db6ac"
                                    xAxisName="xAxis"
                                    yAxisName="yAxis"
                                    valueMemberPath="Subject4" />
                                </IgrDataChart>
                            </div>
                    </div>
                    <div
                        className="dockManagerContent"
                        slot="barChartSub5Container"
                        id="barChartSub5Container">
                            <div className="igComponent" >
                            <IgrDataChart
                                    width="100%"
                                    height="100%"
                                    ref={this.barChartSub5Ref}
                                    isHorizontalZoomEnabled={true}
                                    isVerticalZoomEnabled={true} >
                                    <IgrCategoryXAxis name="xAxis" label="Month" interval="1"
                                        title={t('Implementation Month')} />
                                    <IgrNumericYAxis name="yAxis" minimumValue={0} maximumValue={100}
                                        title={t('Score')} />
                                    <IgrColumnSeries
                                    name="series5"
                                    outline="transparent" brush="#ffd54f"
                                    xAxisName="xAxis"
                                    yAxisName="yAxis"
                                    valueMemberPath="Subject5" />
                                </IgrDataChart>
                            </div>
                    </div>
                    <div
                        className="dockManagerContent"
                        slot="radialChartContainer"
                        id="radialChartContainer">
                            <IgrDataChart
                                width="100%"
                                height="100%"
                                gridMode="BeforeSeries"
                                brushes="#09f"
                                outlines="#09f"
                                ref={this.radialChartRef}
                                isHorizontalZoomEnabled={true}
                                isVerticalZoomEnabled={true} >
                                <IgrCategoryAngleAxis name="angleAxis" label="Subject" />
                                <IgrNumericRadiusAxis name="radiusAxis" innerRadiusExtentScale={0.1} strokeThickness={1} tickStrokeThickness={1} minimumValue={0} maximumValue={100} />
                                <IgrRadialLineSeries
                                    name="Result"
                                    valueMemberPath="Result"
                                    valueAxisName="radiusAxis"
                                    angleAxisName="angleAxis"
                                    title={t('Score')}
                                    showDefaultTooltip="true" />
                            </IgrDataChart>
                    </div>
                    <div
                        className="dockManagerContent"
                        slot="ResultGridContainer"
                        id="ResultGridContainer" >
                            <span style={{margin: '.5em 0 .5em 0'}}>{t('Selected Students Name', { ID: this.state.ID, ClassNumber:this.state.ClassNumber, Name:this.state.Name })}</span>
                            <IgrDataGrid
                                height="100%"
                                width="100%"
                                editMode="None"
                                ref={this.gridRef}
                                summaryScope="Root"
                                groupSummaryDisplayMode="RowBottom"
                                autoGenerateColumns="false">
                                <IgrTextColumn borderRightWidth="1" border="#dddddd" field="Month" headerText={t('Implementation Month')} />
                                <IgrTextColumn borderRightWidth="1" border="#dddddd" field="Subject1" headerText={t('school.subject1')} />
                                <IgrTextColumn borderRightWidth="1" border="#dddddd" field="Subject2" headerText={t('school.subject2')} />
                                <IgrTextColumn borderRightWidth="1" border="#dddddd" field="Subject3" headerText={t('school.subject3')} />
                                <IgrTextColumn borderRightWidth="1" border="#dddddd" field="Subject4" headerText={t('school.subject4')} />
                                <IgrTextColumn borderRightWidth="1" border="#dddddd" field="Subject5" headerText={t('school.subject5')} />
                            </IgrDataGrid>
                    </div>
                </igc-dockmanager>
            </div>
        );
    }

    public gridRef(grid: IgrDataGrid) {
        if (!grid) { return; }
        this.grid = grid;
        if (this.studentsGrid && this.grid && this.barChart && this.barChartSub1 && this.barChartSub2 && this.barChartSub3 && this.barChartSub4 && this.barChartSub5 && this.radialChart && this.studentsDatabase) {
            this.onReady();
        }
    }
    public studentsGridRef(studentsGrid: IgrDataGrid) {
        if (!studentsGrid) { return; }
        this.studentsGrid = studentsGrid;
        if (this.studentsGrid && this.grid && this.barChart && this.barChartSub1 && this.barChartSub2 && this.barChartSub3 && this.barChartSub4 && this.barChartSub5 && this.radialChart && this.studentsDatabase) {
            this.onReady();
        }
    }
    private barChartRef(barChart: IgrDataChart) {
        if (!barChart) { return; }
        this.barChart = barChart;
        if (this.barChartLegend) {
            this.barChart.legend = this.barChartLegend;
        }
        if (this.studentsGrid && this.grid && this.barChart && this.barChartSub1 && this.barChartSub2 && this.barChartSub3 && this.barChartSub4 && this.barChartSub5 && this.radialChart && this.studentsDatabase) {
            this.onReady();
        }
    }
    public barChartLegendRef(barChartLegend: IgrLegend) {
        if (!barChartLegend) { return; }
        this.barChartLegend = barChartLegend;
        if (this.barChart) {
            this.barChart.legend = this.barChartLegend;
        }
    }
    private barChartSub1Ref(barChartSub1: IgrDataChart) {
        if (!barChartSub1) { return; }
        this.barChartSub1 = barChartSub1;
        if (this.studentsGrid && this.grid && this.barChart && this.barChartSub1 && this.barChartSub2 && this.barChartSub3 && this.barChartSub4 && this.barChartSub5 && this.radialChart && this.studentsDatabase) {
            this.onReady();
        }
    }
    private barChartSub2Ref(barChartSub2: IgrDataChart) {
        if (!barChartSub2) { return; }
        this.barChartSub2 = barChartSub2;
        if (this.studentsGrid && this.grid && this.barChart && this.barChartSub1 && this.barChartSub2 && this.barChartSub3 && this.barChartSub4 && this.barChartSub5 && this.radialChart && this.studentsDatabase) {
            this.onReady();
        }
    }
    private barChartSub3Ref(barChartSub3: IgrDataChart) {
        if (!barChartSub3) { return; }
        this.barChartSub3 = barChartSub3;
        if (this.studentsGrid && this.grid && this.barChart && this.barChartSub1 && this.barChartSub2 && this.barChartSub3 && this.barChartSub4 && this.barChartSub5 && this.radialChart && this.studentsDatabase) {
            this.onReady();
        }
    }
    private barChartSub4Ref(barChartSub4: IgrDataChart) {
        if (!barChartSub4) { return; }
        this.barChartSub4 = barChartSub4;
        if (this.studentsGrid && this.grid && this.barChart && this.barChartSub1 && this.barChartSub2 && this.barChartSub3 && this.barChartSub4 && this.barChartSub5 && this.radialChart && this.studentsDatabase) {
            this.onReady();
        }
    }
    private barChartSub5Ref(barChartSub5: IgrDataChart) {
        if (!barChartSub5) { return; }
        this.barChartSub5 = barChartSub5;
        if (this.studentsGrid && this.grid && this.barChart && this.barChartSub1 && this.barChartSub2 && this.barChartSub3 && this.barChartSub4 && this.barChartSub5 && this.radialChart && this.studentsDatabase) {
            this.onReady();
        }
    }
    private radialChartRef(radialChart: IgrDataChart) {
        this.radialChart = radialChart;
        if (this.studentsGrid && this.grid && this.barChart && this.barChartSub1 && this.barChartSub2 && this.barChartSub3 && this.barChartSub4 && this.barChartSub5 && this.radialChart && this.studentsDatabase) {
            this.onReady();
        }
    }

    private onReady() {

        this.resultViewContainer = document.getElementById("resultViewContainer") as HTMLDivElement;
        this.studentsGridContainer = document.getElementById("studentsGridContainer") as HTMLDivElement;
        this.resultGridContainer = document.getElementById("ResultGridContainer") as HTMLDivElement;
        this.barChartContainer = document.getElementById("barChartContainer") as HTMLDivElement;
        this.barChartContainer.style.overflow = "hidden";
        this.barChartSub1Container = document.getElementById("barChartSub1Container") as HTMLDivElement;
        this.barChartSub1Container.style.overflow = "hidden";
        this.barChartSub2Container = document.getElementById("barChartSub2Container") as HTMLDivElement;
        this.barChartSub2Container.style.overflow = "hidden";
        this.barChartSub3Container = document.getElementById("barChartSub3Container") as HTMLDivElement;
        this.barChartSub3Container.style.overflow = "hidden";
        this.barChartSub4Container = document.getElementById("barChartSub4Container") as HTMLDivElement;
        this.barChartSub4Container.style.overflow = "hidden";
        this.barChartSub5Container = document.getElementById("barChartSub5Container") as HTMLDivElement;
        this.barChartSub5Container.style.overflow = "hidden";
        this.radialChartContainer = document.getElementById("radialChartContainer") as HTMLDivElement;
        this.radialChartContainer.style.overflow = "hidden";

        this.barChartPane = {
            header: this.props.t('Monthly Total Scores'),
            type: IgcDockManagerPaneType.contentPane,
            contentId: "barChartContainer"
        };
        this.barChartSub1Pane = {
            header: this.props.t('school.subject1'),
            type: IgcDockManagerPaneType.contentPane,
            contentId: "barChartSub1Container"
        };
        this.barChartSub2Pane = {
            header: this.props.t('school.subject2'),
            type: IgcDockManagerPaneType.contentPane,
            contentId: "barChartSub2Container"
        };
        this.barChartSub3Pane = {
            header: this.props.t('school.subject3'),
            type: IgcDockManagerPaneType.contentPane,
            contentId: "barChartSub3Container"
        };
        this.barChartSub4Pane = {
            header: this.props.t('school.subject4'),
            type: IgcDockManagerPaneType.contentPane,
            contentId: "barChartSub4Container"
        };
        this.barChartSub5Pane = {
            header: this.props.t('school.subject5'),
            type: IgcDockManagerPaneType.contentPane,
            contentId: "barChartSub5Container"
        };
        this.radialChartPane = {
            header: this.props.t('Average Scores By Subject'),
            type: IgcDockManagerPaneType.contentPane,
            contentId: "radialChartContainer"
        };
        this.resultGridPane = {
            header: this.props.t('Monthly Test Scores This Year', { previousYear: this.previousYear }),
            type: IgcDockManagerPaneType.contentPane,
            contentId: "ResultGridContainer"
        };
        this.studentsListPane = {
            header: this.props.t('Students List'),
            type: IgcDockManagerPaneType.contentPane,
            contentId: "studentsGridContainer"
        };

        this.dockManager = document.getElementById("dockManager") as IgcDockManagerComponent;
        this.dockManager.layout = {
            rootPane: {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.horizontal,
                panes: [
                    {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.vertical,
                        size: 120,
                        panes: [this.studentsListPane]
                    },
                    {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.vertical,
                        size: 270,
                        panes: [
                            {
                                type: IgcDockManagerPaneType.splitPane,
                                orientation: IgcSplitPaneOrientation.horizontal,
                                panes: [
                                    {
                                        type: IgcDockManagerPaneType.tabGroupPane,
                                        size: 200,
                                        panes: [
                                            this.barChartPane,
                                            this.barChartSub1Pane,
                                            this.barChartSub2Pane,
                                            this.barChartSub3Pane,
                                            this.barChartSub4Pane,
                                            this.barChartSub5Pane,
                                        ]
                                    },
                                    this.radialChartPane
                                ],
                                size: 200,
                            },
                            {
                                type: IgcDockManagerPaneType.splitPane,
                                orientation: IgcSplitPaneOrientation.horizontal,
                                panes: [this.resultGridPane],
                                size: 300,
                            }
                        ]
                    }
                ]
            }
        };

        this.showDetail(this.studentsDatabase[0].Results,this.studentsDatabase[0].ID,this.studentsDatabase[0].Name,this.studentsDatabase[0].ClassNumber)

    }

    public onGridSearchChanged(event: any) {
        let term = event.target.value;
        if (!this.studentsGrid) {
            return;
        }
        if (!term || term.length === 0) {
            this.studentsGrid.filterExpressions.clear();
        } else {
            let ff = FilterFactory.instance;
            let filter = ff.property("ID").toLower().contains(ff.literal(term).toLower())
                .or(ff.property("Name").toLower().contains(ff.literal(term).toLower()));
            this.studentsGrid.filterExpressions.clear();
            this.studentsGrid.filterExpressions.add(filter);
        }
    }

    convertDataForRadial = (data:any) => {
        const Sub1Avg = (Math.round(data.reduce((total: any, next: { Subject1: any; }) => total + next.Subject1, 0) / data.length * 10)) / 10;
        const Sub2Avg = (Math.round(data.reduce((total: any, next: { Subject2: any; }) => total + next.Subject2, 0) / data.length * 10)) / 10;
        const Sub3Avg = (Math.round(data.reduce((total: any, next: { Subject3: any; }) => total + next.Subject3, 0) / data.length * 10)) / 10;
        const Sub4Avg = (Math.round(data.reduce((total: any, next: { Subject4: any; }) => total + next.Subject4, 0) / data.length * 10)) / 10;
        const Sub5Avg = (Math.round(data.reduce((total: any, next: { Subject5: any; }) => total + next.Subject5, 0) / data.length * 10)) / 10;
        const avgs = [
            {"Result": Sub1Avg, "Subject": this.props.t('school.subject1') },
            {"Result": Sub2Avg, "Subject": this.props.t('school.subject2') },
            {"Result": Sub3Avg, "Subject": this.props.t('school.subject3') },
            {"Result": Sub4Avg, "Subject": this.props.t('school.subject4') },
            {"Result": Sub5Avg, "Subject": this.props.t('school.subject5') }
        ];
        return avgs;
    }

    selectedItemsChanged = (s: IgrDataGrid, e: IgrGridSelectedItemsChangedEventArgs) => {
        const index = s.selectedItems.count - 1;
        if (index > -1 && e.currentItems.item(index) && e.currentItems.item(index).ID) {
            const selectedItem = e.currentItems.item(index).Results;
            this.showDetail(
                selectedItem,
                e.currentItems.item(index).ID,
                e.currentItems.item(index).Name,
                e.currentItems.item(index).ClassNumber
            );
        }
    }

    showDetail = (item:any, id:string, name:string, classNumber:string) => {
        this.grid.dataSource = item;
        this.barChart.dataSource = item;
        this.barChartSub1.dataSource = item;
        this.barChartSub2.dataSource = item;
        this.barChartSub3.dataSource = item;
        this.barChartSub4.dataSource = item;
        this.barChartSub5.dataSource = item;
        this.radialChart.dataSource = this.convertDataForRadial(item);
        this.setState({ID: id});
        this.setState({ClassNumber: classNumber});
        this.setState({Name: name});
        this.printAvarage();
    }

    public printAvarage() {
        this.grid.summaryDescriptions.clear();
        const Subject1Avg = new IgrColumnSummaryDescription();
        Subject1Avg.field = "Subject1";
        Subject1Avg.operand = SummaryOperand.Custom;
        Subject1Avg.provideCalculator = this.onProvideCalculator;
        this.grid.summaryDescriptions.add(Subject1Avg);
        const Subject2Avg = new IgrColumnSummaryDescription();
        Subject2Avg.field = "Subject2";
        Subject2Avg.operand = SummaryOperand.Custom;
        Subject2Avg.provideCalculator = this.onProvideCalculator;
        this.grid.summaryDescriptions.add(Subject2Avg);
        const Subject3Avg = new IgrColumnSummaryDescription();
        Subject3Avg.field = "Subject3";
        Subject3Avg.operand = SummaryOperand.Custom;
        Subject3Avg.provideCalculator = this.onProvideCalculator;
        this.grid.summaryDescriptions.add(Subject3Avg);
        const Subject4Avg = new IgrColumnSummaryDescription();
        Subject4Avg.field = "Subject4";
        Subject4Avg.operand = SummaryOperand.Custom;
        Subject4Avg.provideCalculator = this.onProvideCalculator;
        this.grid.summaryDescriptions.add(Subject4Avg);
        const Subject5Avg = new IgrColumnSummaryDescription();
        Subject5Avg.field = "Subject5";
        Subject5Avg.operand = SummaryOperand.Custom;
        Subject5Avg.provideCalculator = this.onProvideCalculator;
        this.grid.summaryDescriptions.add(Subject5Avg);
    }

    public onProvideCalculator = (s: IgrColumnSummaryDescription, e: IgrProvideCalculatorEventArgs) => {
        const avgString = this.props.t('Average');
        e.calculator = new CustomAvg(avgString);
    }

}
export default withTranslation()(DockManagerUpdatingPanes)

class CustomAvg extends SummaryCalculator
{
    constructor(private avgString: string) {
        super();
    }

    get displayName(): string {
        return this.avgString;
    }
    public avg: number;
    public subject: string;
    public index: number;

    public beginCalculation(a: IDataSource, b: string): void {
        super.beginCalculation(a,b);
        this.avg = 0;
        this.index = 0;
        this.subject = b;
    }
    public endCalculation(): ISummaryResult {
        var result = (Math.round(this.avg / this.index * 10)) / 10;
        return new DefaultSummaryResult(this.propertyName, SummaryOperand.Custom, result)
    }
    public aggregate(a: any): void {
        this.index++;
        this.avg += a[this.subject];
    }
}