import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "./index";

interface OrderAttributes {
  id: number;
  bornInBrasil: boolean;
  taxDomicile: boolean;
  responsibleForActs: boolean;
  politicallyExposedPerson: boolean;
  authorizeSCRConsultation: boolean;
  shareData: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  fullname?: string;
  birthdayDate?: string;
  motherName?: string;
  phone?: string;
  email?: string;
  gender?: string;
  maritalStatus?: string;
  stableUnion?: string;
  levelOfEducation?: string;
  doc?: string;
  rgNumber?: string;
  rgDate?: string;
  issuingBody?: string;
  issuingState?: string;
  docFront?: string;
  docBack?: string;
  number?: string;
  cep?: string;
  address?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  propertySituation?: string;
  frontDocumnetImange?: string;
  balckDocumentImage?: string;
  incomeEmissionDate?: string;
  statarOcupationDate?: string;
  origin?: string;
  profession?: string;
  incomeDocumentType?: string;
  income?: string;
  incomeDocument?: string;
  selfieMedia?: string;
}

interface TaskCreationAttributes extends Optional<OrderAttributes, "id"> {}

class Order extends Model<OrderAttributes, TaskCreationAttributes> implements OrderAttributes {
	public id!: number;
	public bornInBrasil!: boolean;
	public taxDomicile!: boolean;
	public responsibleForActs!: boolean;
	public politicallyExposedPerson!: boolean;
	public authorizeSCRConsultation!: boolean;
	public shareData!: boolean;
	public fullname!: string;
	public birthdayDate!: string;
	public motherName!: string;
	public phone!: string;
	public email!: string;
	public gender!: string;
	public maritalStatus!: string;
	public stableUnion!: string;
	public levelOfEducation!: string;
	public doc!: string;
	public rgNumber!: string;
	public rgDate!: string;
	public issuingBody!: string;
	public issuingState!: string;
	public docFront!: string;
	public docBack!: string;
	public number!: string;
	public cep!: string;
	public address!: string;
	public complement!: string;
	public neighborhood!: string;
	public city!: string;
	public state!: string;
	public propertySituation!: string;
	public frontDocumnetImange!: string;
	public balckDocumentImage!: string;
	public incomeEmissionDate!: string;
	public statarOcupationDate!: string;
	public origin!: string;
	public profession!: string;
	public incomeDocumentType!: string;
	public income!: string;
	public incomeDocument!: string;
	public selfieMedia!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Order.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		bornInBrasil: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		taxDomicile: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		responsibleForActs: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		politicallyExposedPerson: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		authorizeSCRConsultation: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		shareData: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		fullname: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		birthdayDate: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		motherName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true
		},
		gender:{
			type: DataTypes.STRING,
			allowNull: true,
		},
		maritalStatus:{
			type: DataTypes.STRING,
			allowNull: true,
		},
		stableUnion:{
			type: DataTypes.STRING,
			allowNull: true,
		},
		levelOfEducation:{
			type: DataTypes.STRING,
			allowNull: true,
		},
		doc:{
			type: DataTypes.STRING,
			allowNull: true,
		},
		rgNumber:{
			type: DataTypes.STRING,
			allowNull: true,
		},
		rgDate: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		issuingBody:{
			type: DataTypes.STRING,
			allowNull: true,
		},
		issuingState: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		docBack: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		docFront: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		number: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		cep: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		neighborhood: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		state: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		complement: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		propertySituation: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		frontDocumnetImange: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		balckDocumentImage: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		incomeEmissionDate: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		statarOcupationDate: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		origin: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		profession: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		incomeDocumentType: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		income: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		incomeDocument: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		selfieMedia: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: "order",
	}
);

export default Order;
