/* eslint-disable @typescript-eslint/naming-convention */
export type UnitOfMeasure = 'Ounces';
export type UnitThcPercent = null;
export type UnitThcContent = null;
export type UnitThcContentUnitOfMeasure = null;
export type UnitWeight = null;
export type UnitWeightUnitOfMeasure = null;
export type InvoiceNumber = null;
export type Price = null;
export type ExciseTax = null;
export type CityTax = null;
export type CountyTax = null;
export type MunicipalTax = null;
export type DiscountAmount = null;
export type SubTotal = null;
export type SalesTax = null;

export type Package = {
	PackageLabel: string;
	Quantity: number;
	UnitOfMeasure: UnitOfMeasure;
	TotalAmount: number;
	UnitThcPercent: UnitThcPercent;
	UnitThcContent: UnitThcContent;
	UnitThcContentUnitOfMeasure: UnitThcContentUnitOfMeasure;
	UnitWeight: UnitWeight;
	UnitWeightUnitOfMeasure: UnitWeightUnitOfMeasure;
	InvoiceNumber: InvoiceNumber;
	Price: Price;
	ExciseTax: ExciseTax;
	CityTax: CityTax;
	CountyTax: CountyTax;
	MunicipalTax: MunicipalTax;
	DiscountAmount: DiscountAmount;
	SubTotal: SubTotal;
	SalesTax: SalesTax;
};
