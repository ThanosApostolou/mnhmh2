USE [master]
GO
/****** Object:  Database [MNHMH]    Script Date: 22/3/2021 09:40:57 ******/
CREATE DATABASE [MNHMH]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MNHMH', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\MNHMH.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MNHMH_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\MNHMH_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [MNHMH] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MNHMH].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MNHMH] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MNHMH] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MNHMH] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MNHMH] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MNHMH] SET ARITHABORT OFF 
GO
ALTER DATABASE [MNHMH] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MNHMH] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MNHMH] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MNHMH] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MNHMH] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MNHMH] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MNHMH] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MNHMH] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MNHMH] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MNHMH] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MNHMH] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MNHMH] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MNHMH] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MNHMH] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MNHMH] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MNHMH] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MNHMH] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MNHMH] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [MNHMH] SET  MULTI_USER 
GO
ALTER DATABASE [MNHMH] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MNHMH] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MNHMH] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MNHMH] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MNHMH] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [MNHMH] SET QUERY_STORE = OFF
GO
USE [MNHMH]
GO
/****** Object:  Schema [audit]    Script Date: 22/3/2021 09:40:57 ******/
CREATE SCHEMA [audit]
GO
/****** Object:  Schema [security]    Script Date: 22/3/2021 09:40:57 ******/
CREATE SCHEMA [security]
GO
/****** Object:  Schema [wf]    Script Date: 22/3/2021 09:40:57 ******/
CREATE SCHEMA [wf]
GO
/****** Object:  Table [audit].[AuditEntityConfigurations]    Script Date: 22/3/2021 09:40:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [audit].[AuditEntityConfigurations](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[FullName] [nvarchar](4000) NULL,
	[ShortName] [nvarchar](4000) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [audit].[AuditLogEntries]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [audit].[AuditLogEntries](
	[Id] [int] NOT NULL,
	[UserName] [nvarchar](4000) NULL,
	[IPAddress] [nvarchar](4000) NULL,
	[EntityFullName] [nvarchar](4000) NULL,
	[EntityShortName] [nvarchar](4000) NULL,
	[EntityId] [nvarchar](4000) NULL,
	[Timestamp] [datetime] NULL,
	[EntryTypeId] [int] NULL,
	[ActionTypeId] [int] NULL,
	[OldValue] [nvarchar](4000) NULL,
	[NewValue] [nvarchar](4000) NULL,
	[PropertyName] [nvarchar](4000) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [audit].[AuditLogEntryTypes]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [audit].[AuditLogEntryTypes](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Code] [nvarchar](4000) NULL,
	[Name] [nvarchar](4000) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [audit].[AuditLogPropertyActionTypes]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [audit].[AuditLogPropertyActionTypes](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Code] [nvarchar](4000) NULL,
	[Name] [nvarchar](4000) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [audit].[AuditPropertyConfigurations]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [audit].[AuditPropertyConfigurations](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](4000) NULL,
	[DataType] [nvarchar](4000) NULL,
	[IsAuditable] [bit] NULL,
	[IsComplex] [bit] NULL,
	[IsCollection] [bit] NULL,
	[Entity] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [audit].[hibernate_sequences]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [audit].[hibernate_sequences](
	[sequence_name] [varchar](255) NOT NULL,
	[next_val] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[sequence_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AmmunitionPortions]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AmmunitionPortions](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](100) NULL,
	[Quantity] [int] NULL,
	[MaterialTab] [int] NULL,
	[AmmunitionStore] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AmmunitionStoreQuantities]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AmmunitionStoreQuantities](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Quantity] [int] NULL,
	[AmmunitionPortion] [int] NULL,
	[AmmunitionStore] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AmmunitionStores]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AmmunitionStores](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](100) NULL,
	[SerialNumber] [decimal](8, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Borrowers]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Borrowers](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](100) NULL,
	[SerialNumber] [decimal](8, 2) NULL,
	[Manager] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Borrowers$]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Borrowers$](
	[Id] [float] NULL,
	[VersionTimestamp] [nvarchar](255) NULL,
	[Name] [nvarchar](255) NULL,
	[SerialNumber] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](100) NULL,
	[SerialNumber] [decimal](8, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categories$]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories$](
	[Id] [float] NULL,
	[VersionTimestamp] [nvarchar](255) NULL,
	[Name] [nvarchar](255) NULL,
	[SerialNumber] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ComparativesPrintPages]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ComparativesPrintPages](
	[Id] [int] NOT NULL,
	[PageNumber] [nvarchar](100) NULL,
	[CommanderSignature] [nvarchar](100) NULL,
	[Group] [nvarchar](100) NULL,
	[EOYAdministratorSignature] [nvarchar](100) NULL,
	[CommissionSignature] [nvarchar](100) NULL,
	[MaterialsAdministratorSignature] [nvarchar](100) NULL,
	[PrintReason] [nvarchar](100) NULL,
	[AdministrationUnit] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DirectMaterialBorrowers]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DirectMaterialBorrowers](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Quantity] [int] NULL,
	[Borrower] [int] NULL,
	[MaterialTab] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DistributionCharges]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DistributionCharges](
	[Id] [int] NOT NULL,
	[PartialRegistryCode] [nvarchar](100) NULL,
	[AOEF] [nvarchar](100) NULL,
	[Category] [nvarchar](100) NULL,
	[Name] [nvarchar](100) NULL,
	[MeasurementUnit] [nvarchar](100) NULL,
	[Quantity] [int] NULL,
	[Comments] [nvarchar](1000) NULL,
	[MaterialTabId] [int] NULL,
	[PartialRegistryCodeNumber] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Groups]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Groups](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](100) NULL,
	[LastRegistryCode] [int] NULL,
	[SerialNumber] [decimal](8, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Groups_To_Categories]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Groups_To_Categories](
	[Categories] [int] NOT NULL,
	[Groups] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[hibernate_sequences]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[hibernate_sequences](
	[sequence_name] [varchar](255) NOT NULL,
	[next_val] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[sequence_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImportsExportsTbl]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImportsExportsTbl](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Date] [datetime] NULL,
	[Unit] [nvarchar](100) NULL,
	[JustificationFileNumber] [nvarchar](100) NULL,
	[Imported] [int] NULL,
	[Exported] [int] NULL,
	[Remaining] [int] NULL,
	[Comments] [nvarchar](1000) NULL,
	[MaterialTab] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Managers]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Managers](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](100) NULL,
	[Rank] [nvarchar](100) NULL,
	[Position] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaterialGroups]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaterialGroups](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](100) NULL,
	[Material_MaterialGroups] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaterialQuantities]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaterialQuantities](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[PartialRegistryCode] [nvarchar](100) NULL,
	[PartialRegistryCodeNumber] [int] NULL,
	[AOEF] [nvarchar](100) NULL,
	[Name] [nvarchar](100) NULL,
	[MeasurementUnit] [nvarchar](100) NULL,
	[TabRemainder] [int] NULL,
	[Sum] [int] NULL,
	[Difference] [int] NULL,
	[Instances] [int] NULL,
	[ImportSum] [int] NULL,
	[ExportSum] [int] NULL,
	[Found] [int] NULL,
	[PendingCrediting] [int] NULL,
	[Surplus] [int] NULL,
	[Deficit] [int] NULL,
	[Image] [nvarchar](100) NULL,
	[GeneralRegistryCode] [int] NULL,
	[Archived] [bit] NULL,
	[Group] [int] NULL,
	[Category] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Materials]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Materials](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](100) NULL,
	[MaterialQuantity] [int] NULL,
	[Borrower] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaterialTabs]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaterialTabs](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[PartialRegistryCode] [nvarchar](100) NULL,
	[PartialRegistryCodeNumber] [int] NULL,
	[AOEF] [nvarchar](100) NULL,
	[Name] [nvarchar](1000) NULL,
	[MeasurementUnit] [nvarchar](100) NULL,
	[TabRemainder] [int] NULL,
	[Sum] [int] NULL,
	[Difference] [int] NULL,
	[Comments] [nvarchar](1000) NULL,
	[ImportSum] [int] NULL,
	[ExportSum] [int] NULL,
	[Found] [int] NULL,
	[PendingCrediting] [int] NULL,
	[Surplus] [int] NULL,
	[Deficit] [int] NULL,
	[Image] [nvarchar](100) NULL,
	[GeneralRegistryCode] [int] NULL,
	[Archived] [bit] NULL,
	[SerialNumber] [decimal](8, 2) NULL,
	[MaterialWithoutTab] [bit] NULL,
	[CurrentMaterialTab] [bit] NULL,
	[GEEFCode] [nvarchar](100) NULL,
	[Group] [int] NULL,
	[Category] [int] NULL,
	[ComparativesPrintPage_MaterialTabs] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Migrations]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Migrations](
	[MigrationVersion] [varchar](25) NOT NULL,
	[UpdateDate] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MigrationVersion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Parsers]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Parsers](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ResourcesHash]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ResourcesHash](
	[Resource] [nvarchar](200) NOT NULL,
	[Hash] [nvarchar](max) NOT NULL,
	[Used] [bit] NOT NULL,
	[UpdateDate] [datetime] NOT NULL,
 CONSTRAINT [PK_ResourcesHash] PRIMARY KEY CLUSTERED 
(
	[Resource] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StaticDataTbl]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StaticDataTbl](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[AdministrationUnitName] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subcategories]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subcategories](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](100) NULL,
	[MaterialTab] [int] NULL,
	[Borrower] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubcategoryContents]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubcategoryContents](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](100) NULL,
	[Quantity] [int] NULL,
	[SubcategoryBelongingTo] [int] NULL,
	[SubcategoryContentTab] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubcategoryMaterials]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubcategoryMaterials](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Quantity] [int] NULL,
	[Borrower] [int] NULL,
	[Subcategory_SubcategoryMaterials] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Submaterials]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Submaterials](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](100) NULL,
	[Quantity] [int] NULL,
	[MaterialBelongingTo] [int] NULL,
	[SubmaterialQuantity] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SynchronizeSchemaInfo]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SynchronizeSchemaInfo](
	[DifferenceHash] [nvarchar](100) NULL,
	[NhibernateFilesHash] [nvarchar](100) NULL,
	[TempDifferenceHash4Check] [nvarchar](100) NULL,
	[UpdateDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SynchronizeSchemaInfoHistory]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SynchronizeSchemaInfoHistory](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UpdateDate] [datetime] NOT NULL,
	[CreateScript] [nvarchar](max) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationClients]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationClients](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[ClientKey] [nvarchar](500) NULL,
	[IPAddress] [nvarchar](100) NULL,
	[SessionId] [nvarchar](100) NULL,
	[ConnectedOn] [datetime] NULL,
	[User] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationLanguages]    Script Date: 22/3/2021 09:40:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationLanguages](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](100) NULL,
	[Code] [nvarchar](100) NULL,
	[Icon] [varbinary](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationOperations]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationOperations](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](255) NOT NULL,
	[ParentControllerName] [nvarchar](100) NULL,
	[Type] [nvarchar](100) NULL,
	[IsAvailableToAnonymous] [bit] NULL,
	[IsAvailableToAllAuthorizedUsers] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationOperations_To_ApplicationPermissions]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationOperations_To_ApplicationPermissions](
	[Operations] [int] NOT NULL,
	[Permissions] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationPermissions]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationPermissions](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[IsCustom] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationPermissions_To_ApplicationRoles]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationPermissions_To_ApplicationRoles](
	[Permissions] [int] NOT NULL,
	[Roles] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationPermissions_To_ApplicationUsers]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationPermissions_To_ApplicationUsers](
	[Permissions] [int] NOT NULL,
	[Users] [nvarchar](256) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationRoles]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationRoles](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[IsCustom] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationRoles_To_ApplicationUsers]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationRoles_To_ApplicationUsers](
	[Roles] [int] NOT NULL,
	[Users] [nvarchar](256) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationSettings]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationSettings](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Key] [nvarchar](500) NULL,
	[Value] [nvarchar](500) NULL,
	[IsCustom] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationThemes]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationThemes](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Name] [nvarchar](100) NULL,
	[Description] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationUserActions]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationUserActions](
	[Id] [int] NOT NULL,
	[UserName] [nvarchar](500) NULL,
	[ActiveRoles] [nvarchar](4000) NULL,
	[ActivePermissions] [nvarchar](4000) NULL,
	[Action] [nvarchar](500) NULL,
	[Controller] [nvarchar](500) NULL,
	[Date] [datetime] NULL,
	[ErrorMessage] [nvarchar](4000) NULL,
	[Success] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationUserClaims]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationUserClaims](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
	[ClaimValueType] [nvarchar](100) NULL,
	[Issuer] [nvarchar](max) NULL,
	[OriginalIssuer] [nvarchar](max) NULL,
	[User] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationUserExternalProfiles]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationUserExternalProfiles](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Gender] [nvarchar](100) NULL,
	[Name] [nvarchar](1000) NULL,
	[Surname] [nvarchar](1000) NULL,
	[DisplayName] [nvarchar](1000) NULL,
	[Email] [nvarchar](1000) NULL,
	[Provider] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationUserLogins]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationUserLogins](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[LoginProvider] [nvarchar](128) NULL,
	[ProviderKey] [nvarchar](128) NULL,
	[User] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ApplicationUsers]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ApplicationUsers](
	[UserName] [nvarchar](256) NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[EmailConfirmed] [bit] NULL,
	[LockoutEnabled] [bit] NULL,
	[PhoneNumberConfirmed] [bit] NULL,
	[TwoFactorEnabled] [bit] NULL,
	[AccessFailedCount] [int] NULL,
	[Name] [nvarchar](256) NULL,
	[Email] [nvarchar](255) NULL,
	[PhoneNumber] [nvarchar](255) NULL,
	[LockoutEndDate] [datetime] NULL,
	[Profile] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [security].[DateTimeFormats]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[DateTimeFormats](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[LongDatePattern] [nvarchar](100) NULL,
	[LongTimePattern] [nvarchar](100) NULL,
	[MonthDayPattern] [nvarchar](100) NULL,
	[RFC1123Pattern] [nvarchar](100) NULL,
	[ShortDatePattern] [nvarchar](100) NULL,
	[ShortTimePattern] [nvarchar](100) NULL,
	[YearMonthPattern] [nvarchar](100) NULL,
	[ApplicationLanguage] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[FileDataTbl]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[FileDataTbl](
	[Id] [uniqueidentifier] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[FileName] [nvarchar](255) NULL,
	[FolderPath] [nvarchar](255) NULL,
	[MaxFileSize] [int] NULL,
	[AllowedExtensions] [nvarchar](max) NULL,
	[Blob] [varbinary](max) NULL,
	[StorageMedium] [int] NULL,
	[UploadedBy] [nvarchar](1000) NULL,
	[UploadDateTime] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [security].[hibernate_sequences]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[hibernate_sequences](
	[sequence_name] [varchar](255) NOT NULL,
	[next_val] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[sequence_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[Profiles]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[Profiles](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[LanguageLCID] [int] NULL,
	[LocaleLCID] [int] NULL,
	[Theme] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [security].[ProfileSettings]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [security].[ProfileSettings](
	[Id] [int] NOT NULL,
	[VersionTimestamp] [timestamp] NULL,
	[Key] [nvarchar](100) NULL,
	[Value] [nvarchar](max) NULL,
	[ParentProfile] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [wf].[WorkflowContextBases]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [wf].[WorkflowContextBases](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](512) NULL,
	[Error] [nvarchar](4000) NULL,
	[Expires] [bit] NULL,
	[ExpirationDateTime] [datetime] NULL,
	[PendingSince] [datetime] NULL,
	[PendingJobCreatedBy] [nvarchar](512) NULL,
	[PendingStep] [nvarchar](512) NULL,
	[Status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [wf].[WorkflowSchedules]    Script Date: 22/3/2021 09:40:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [wf].[WorkflowSchedules](
	[Workflow] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[StartDateTime] [datetime] NULL,
	[ExpireOn] [datetime] NULL,
	[CronExpression] [nvarchar](100) NULL,
	[LastExecution] [datetime] NULL,
	[LastExecutionMessage] [nvarchar](max) NULL,
	[IsLastExecutionSuccess] [bit] NULL,
	[Active] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Workflow] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [audit].[AuditPropertyConfigurations]  WITH CHECK ADD  CONSTRAINT [FK_AuditEntityConfigurations_To_AuditPropertyConfigurations_On_Properties] FOREIGN KEY([Entity])
REFERENCES [audit].[AuditEntityConfigurations] ([Id])
GO
ALTER TABLE [audit].[AuditPropertyConfigurations] CHECK CONSTRAINT [FK_AuditEntityConfigurations_To_AuditPropertyConfigurations_On_Properties]
GO
ALTER TABLE [dbo].[AmmunitionPortions]  WITH CHECK ADD  CONSTRAINT [FK_AmmunitionStores_To_AmmunitionPortions_On_AmmunitionPortions] FOREIGN KEY([AmmunitionStore])
REFERENCES [dbo].[AmmunitionStores] ([Id])
GO
ALTER TABLE [dbo].[AmmunitionPortions] CHECK CONSTRAINT [FK_AmmunitionStores_To_AmmunitionPortions_On_AmmunitionPortions]
GO
ALTER TABLE [dbo].[AmmunitionPortions]  WITH CHECK ADD  CONSTRAINT [FK_MaterialTabs_To_AmmunitionPortions_On_AmmunitionPortions] FOREIGN KEY([MaterialTab])
REFERENCES [dbo].[MaterialTabs] ([Id])
GO
ALTER TABLE [dbo].[AmmunitionPortions] CHECK CONSTRAINT [FK_MaterialTabs_To_AmmunitionPortions_On_AmmunitionPortions]
GO
ALTER TABLE [dbo].[AmmunitionStoreQuantities]  WITH CHECK ADD  CONSTRAINT [FK_AmmunitionStoreQuantities_To_AmmunitionPortions_On_AmmunitionPortion] FOREIGN KEY([AmmunitionPortion])
REFERENCES [dbo].[AmmunitionPortions] ([Id])
GO
ALTER TABLE [dbo].[AmmunitionStoreQuantities] CHECK CONSTRAINT [FK_AmmunitionStoreQuantities_To_AmmunitionPortions_On_AmmunitionPortion]
GO
ALTER TABLE [dbo].[AmmunitionStoreQuantities]  WITH CHECK ADD  CONSTRAINT [FK_AmmunitionStores_To_AmmunitionStoreQuantities_On_Quantities] FOREIGN KEY([AmmunitionStore])
REFERENCES [dbo].[AmmunitionStores] ([Id])
GO
ALTER TABLE [dbo].[AmmunitionStoreQuantities] CHECK CONSTRAINT [FK_AmmunitionStores_To_AmmunitionStoreQuantities_On_Quantities]
GO
ALTER TABLE [dbo].[Borrowers]  WITH CHECK ADD  CONSTRAINT [FK_Borrowers_To_Managers_On_Manager] FOREIGN KEY([Manager])
REFERENCES [dbo].[Managers] ([Id])
GO
ALTER TABLE [dbo].[Borrowers] CHECK CONSTRAINT [FK_Borrowers_To_Managers_On_Manager]
GO
ALTER TABLE [dbo].[DirectMaterialBorrowers]  WITH CHECK ADD  CONSTRAINT [FK_DirectMaterialBorrowers_To_Borrowers_On_Borrower] FOREIGN KEY([Borrower])
REFERENCES [dbo].[Borrowers] ([Id])
GO
ALTER TABLE [dbo].[DirectMaterialBorrowers] CHECK CONSTRAINT [FK_DirectMaterialBorrowers_To_Borrowers_On_Borrower]
GO
ALTER TABLE [dbo].[DirectMaterialBorrowers]  WITH CHECK ADD  CONSTRAINT [FK_MaterialTabs_To_DirectMaterialBorrowers_On_DirectMaterialBorrowers] FOREIGN KEY([MaterialTab])
REFERENCES [dbo].[MaterialTabs] ([Id])
GO
ALTER TABLE [dbo].[DirectMaterialBorrowers] CHECK CONSTRAINT [FK_MaterialTabs_To_DirectMaterialBorrowers_On_DirectMaterialBorrowers]
GO
ALTER TABLE [dbo].[Groups_To_Categories]  WITH CHECK ADD  CONSTRAINT [FK_Categories_To_Groups_On_Groups] FOREIGN KEY([Categories])
REFERENCES [dbo].[Categories] ([Id])
GO
ALTER TABLE [dbo].[Groups_To_Categories] CHECK CONSTRAINT [FK_Categories_To_Groups_On_Groups]
GO
ALTER TABLE [dbo].[Groups_To_Categories]  WITH CHECK ADD  CONSTRAINT [FK_Groups_To_Categories_On_Categories] FOREIGN KEY([Groups])
REFERENCES [dbo].[Groups] ([Id])
GO
ALTER TABLE [dbo].[Groups_To_Categories] CHECK CONSTRAINT [FK_Groups_To_Categories_On_Categories]
GO
ALTER TABLE [dbo].[ImportsExportsTbl]  WITH CHECK ADD  CONSTRAINT [FK_MaterialTabs_To_ImportsExportsTbl_On_ImportsExports] FOREIGN KEY([MaterialTab])
REFERENCES [dbo].[MaterialTabs] ([Id])
GO
ALTER TABLE [dbo].[ImportsExportsTbl] CHECK CONSTRAINT [FK_MaterialTabs_To_ImportsExportsTbl_On_ImportsExports]
GO
ALTER TABLE [dbo].[MaterialQuantities]  WITH CHECK ADD  CONSTRAINT [FK_MaterialQuantities_To_Categories_On_Category] FOREIGN KEY([Category])
REFERENCES [dbo].[Categories] ([Id])
GO
ALTER TABLE [dbo].[MaterialQuantities] CHECK CONSTRAINT [FK_MaterialQuantities_To_Categories_On_Category]
GO
ALTER TABLE [dbo].[MaterialQuantities]  WITH CHECK ADD  CONSTRAINT [FK_MaterialQuantities_To_Groups_On_Group] FOREIGN KEY([Group])
REFERENCES [dbo].[Groups] ([Id])
GO
ALTER TABLE [dbo].[MaterialQuantities] CHECK CONSTRAINT [FK_MaterialQuantities_To_Groups_On_Group]
GO
ALTER TABLE [dbo].[Materials]  WITH CHECK ADD  CONSTRAINT [FK_MaterialQuantities_To_Materials_On_Materials] FOREIGN KEY([MaterialQuantity])
REFERENCES [dbo].[MaterialQuantities] ([Id])
GO
ALTER TABLE [dbo].[Materials] CHECK CONSTRAINT [FK_MaterialQuantities_To_Materials_On_Materials]
GO
ALTER TABLE [dbo].[Materials]  WITH CHECK ADD  CONSTRAINT [FK_Materials_To_Borrowers_On_Borrower] FOREIGN KEY([Borrower])
REFERENCES [dbo].[Borrowers] ([Id])
GO
ALTER TABLE [dbo].[Materials] CHECK CONSTRAINT [FK_Materials_To_Borrowers_On_Borrower]
GO
ALTER TABLE [dbo].[MaterialTabs]  WITH CHECK ADD  CONSTRAINT [FK_ComparativesPrintPages_To_MaterialTabs_On_MaterialTabs] FOREIGN KEY([ComparativesPrintPage_MaterialTabs])
REFERENCES [dbo].[ComparativesPrintPages] ([Id])
GO
ALTER TABLE [dbo].[MaterialTabs] CHECK CONSTRAINT [FK_ComparativesPrintPages_To_MaterialTabs_On_MaterialTabs]
GO
ALTER TABLE [dbo].[MaterialTabs]  WITH CHECK ADD  CONSTRAINT [FK_MaterialTabs_To_Categories_On_Category] FOREIGN KEY([Category])
REFERENCES [dbo].[Categories] ([Id])
GO
ALTER TABLE [dbo].[MaterialTabs] CHECK CONSTRAINT [FK_MaterialTabs_To_Categories_On_Category]
GO
ALTER TABLE [dbo].[MaterialTabs]  WITH CHECK ADD  CONSTRAINT [FK_MaterialTabs_To_Groups_On_Group] FOREIGN KEY([Group])
REFERENCES [dbo].[Groups] ([Id])
GO
ALTER TABLE [dbo].[MaterialTabs] CHECK CONSTRAINT [FK_MaterialTabs_To_Groups_On_Group]
GO
ALTER TABLE [dbo].[Subcategories]  WITH CHECK ADD  CONSTRAINT [FK_MaterialTabs_To_Subcategories_On_Subcategories] FOREIGN KEY([MaterialTab])
REFERENCES [dbo].[MaterialTabs] ([Id])
GO
ALTER TABLE [dbo].[Subcategories] CHECK CONSTRAINT [FK_MaterialTabs_To_Subcategories_On_Subcategories]
GO
ALTER TABLE [dbo].[Subcategories]  WITH CHECK ADD  CONSTRAINT [FK_Subcategories_To_Borrowers_On_Borrower] FOREIGN KEY([Borrower])
REFERENCES [dbo].[Borrowers] ([Id])
GO
ALTER TABLE [dbo].[Subcategories] CHECK CONSTRAINT [FK_Subcategories_To_Borrowers_On_Borrower]
GO
ALTER TABLE [dbo].[SubcategoryContents]  WITH CHECK ADD  CONSTRAINT [FK_Subcategories_To_SubcategoryContents_On_Content] FOREIGN KEY([SubcategoryBelongingTo])
REFERENCES [dbo].[Subcategories] ([Id])
GO
ALTER TABLE [dbo].[SubcategoryContents] CHECK CONSTRAINT [FK_Subcategories_To_SubcategoryContents_On_Content]
GO
ALTER TABLE [dbo].[SubcategoryContents]  WITH CHECK ADD  CONSTRAINT [FK_SubcategoryContents_To_MaterialTabs_On_SubcategoryContentTab] FOREIGN KEY([SubcategoryContentTab])
REFERENCES [dbo].[MaterialTabs] ([Id])
GO
ALTER TABLE [dbo].[SubcategoryContents] CHECK CONSTRAINT [FK_SubcategoryContents_To_MaterialTabs_On_SubcategoryContentTab]
GO
ALTER TABLE [dbo].[SubcategoryMaterials]  WITH CHECK ADD  CONSTRAINT [FK_Subcategories_To_SubcategoryMaterials_On_SubcategoryMaterials] FOREIGN KEY([Subcategory_SubcategoryMaterials])
REFERENCES [dbo].[Subcategories] ([Id])
GO
ALTER TABLE [dbo].[SubcategoryMaterials] CHECK CONSTRAINT [FK_Subcategories_To_SubcategoryMaterials_On_SubcategoryMaterials]
GO
ALTER TABLE [dbo].[SubcategoryMaterials]  WITH CHECK ADD  CONSTRAINT [FK_SubcategoryMaterials_To_Borrowers_On_Borrower] FOREIGN KEY([Borrower])
REFERENCES [dbo].[Borrowers] ([Id])
GO
ALTER TABLE [dbo].[SubcategoryMaterials] CHECK CONSTRAINT [FK_SubcategoryMaterials_To_Borrowers_On_Borrower]
GO
ALTER TABLE [dbo].[Submaterials]  WITH CHECK ADD  CONSTRAINT [FK_Materials_To_Submaterials_On_Submaterials] FOREIGN KEY([MaterialBelongingTo])
REFERENCES [dbo].[Materials] ([Id])
GO
ALTER TABLE [dbo].[Submaterials] CHECK CONSTRAINT [FK_Materials_To_Submaterials_On_Submaterials]
GO
ALTER TABLE [dbo].[Submaterials]  WITH CHECK ADD  CONSTRAINT [FK_Submaterials_To_MaterialQuantities_On_SubmaterialQuantity] FOREIGN KEY([SubmaterialQuantity])
REFERENCES [dbo].[MaterialQuantities] ([Id])
GO
ALTER TABLE [dbo].[Submaterials] CHECK CONSTRAINT [FK_Submaterials_To_MaterialQuantities_On_SubmaterialQuantity]
GO
ALTER TABLE [security].[ApplicationClients]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationUsers_To_ApplicationClients_On_Clients] FOREIGN KEY([User])
REFERENCES [security].[ApplicationUsers] ([UserName])
GO
ALTER TABLE [security].[ApplicationClients] CHECK CONSTRAINT [FK_ApplicationUsers_To_ApplicationClients_On_Clients]
GO
ALTER TABLE [security].[ApplicationOperations_To_ApplicationPermissions]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationOperations_To_ApplicationPermissions_On_Permissions] FOREIGN KEY([Operations])
REFERENCES [security].[ApplicationOperations] ([Id])
GO
ALTER TABLE [security].[ApplicationOperations_To_ApplicationPermissions] CHECK CONSTRAINT [FK_ApplicationOperations_To_ApplicationPermissions_On_Permissions]
GO
ALTER TABLE [security].[ApplicationOperations_To_ApplicationPermissions]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationPermissions_To_ApplicationOperations_On_Operations] FOREIGN KEY([Permissions])
REFERENCES [security].[ApplicationPermissions] ([Id])
GO
ALTER TABLE [security].[ApplicationOperations_To_ApplicationPermissions] CHECK CONSTRAINT [FK_ApplicationPermissions_To_ApplicationOperations_On_Operations]
GO
ALTER TABLE [security].[ApplicationPermissions_To_ApplicationRoles]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationPermissions_To_ApplicationRoles_On_Roles] FOREIGN KEY([Permissions])
REFERENCES [security].[ApplicationPermissions] ([Id])
GO
ALTER TABLE [security].[ApplicationPermissions_To_ApplicationRoles] CHECK CONSTRAINT [FK_ApplicationPermissions_To_ApplicationRoles_On_Roles]
GO
ALTER TABLE [security].[ApplicationPermissions_To_ApplicationRoles]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationRoles_To_ApplicationPermissions_On_Permissions] FOREIGN KEY([Roles])
REFERENCES [security].[ApplicationRoles] ([Id])
GO
ALTER TABLE [security].[ApplicationPermissions_To_ApplicationRoles] CHECK CONSTRAINT [FK_ApplicationRoles_To_ApplicationPermissions_On_Permissions]
GO
ALTER TABLE [security].[ApplicationPermissions_To_ApplicationUsers]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationPermissions_To_ApplicationUsers_On_Users] FOREIGN KEY([Permissions])
REFERENCES [security].[ApplicationPermissions] ([Id])
GO
ALTER TABLE [security].[ApplicationPermissions_To_ApplicationUsers] CHECK CONSTRAINT [FK_ApplicationPermissions_To_ApplicationUsers_On_Users]
GO
ALTER TABLE [security].[ApplicationPermissions_To_ApplicationUsers]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationUsers_To_ApplicationPermissions_On_Permissions] FOREIGN KEY([Users])
REFERENCES [security].[ApplicationUsers] ([UserName])
GO
ALTER TABLE [security].[ApplicationPermissions_To_ApplicationUsers] CHECK CONSTRAINT [FK_ApplicationUsers_To_ApplicationPermissions_On_Permissions]
GO
ALTER TABLE [security].[ApplicationRoles_To_ApplicationUsers]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationRoles_To_ApplicationUsers_On_Users] FOREIGN KEY([Roles])
REFERENCES [security].[ApplicationRoles] ([Id])
GO
ALTER TABLE [security].[ApplicationRoles_To_ApplicationUsers] CHECK CONSTRAINT [FK_ApplicationRoles_To_ApplicationUsers_On_Users]
GO
ALTER TABLE [security].[ApplicationRoles_To_ApplicationUsers]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationUsers_To_ApplicationRoles_On_Roles] FOREIGN KEY([Users])
REFERENCES [security].[ApplicationUsers] ([UserName])
GO
ALTER TABLE [security].[ApplicationRoles_To_ApplicationUsers] CHECK CONSTRAINT [FK_ApplicationUsers_To_ApplicationRoles_On_Roles]
GO
ALTER TABLE [security].[ApplicationUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationUsers_To_ApplicationUserClaims_On_Claims] FOREIGN KEY([User])
REFERENCES [security].[ApplicationUsers] ([UserName])
GO
ALTER TABLE [security].[ApplicationUserClaims] CHECK CONSTRAINT [FK_ApplicationUsers_To_ApplicationUserClaims_On_Claims]
GO
ALTER TABLE [security].[ApplicationUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationUsers_To_ApplicationUserLogins_On_Logins] FOREIGN KEY([User])
REFERENCES [security].[ApplicationUsers] ([UserName])
GO
ALTER TABLE [security].[ApplicationUserLogins] CHECK CONSTRAINT [FK_ApplicationUsers_To_ApplicationUserLogins_On_Logins]
GO
ALTER TABLE [security].[ApplicationUsers]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationUsers_To_Profiles_On_Profile] FOREIGN KEY([Profile])
REFERENCES [security].[Profiles] ([Id])
GO
ALTER TABLE [security].[ApplicationUsers] CHECK CONSTRAINT [FK_ApplicationUsers_To_Profiles_On_Profile]
GO
ALTER TABLE [security].[DateTimeFormats]  WITH CHECK ADD  CONSTRAINT [FK_DateTimeFormats_To_ApplicationLanguages_On_ApplicationLanguage] FOREIGN KEY([ApplicationLanguage])
REFERENCES [security].[ApplicationLanguages] ([Id])
GO
ALTER TABLE [security].[DateTimeFormats] CHECK CONSTRAINT [FK_DateTimeFormats_To_ApplicationLanguages_On_ApplicationLanguage]
GO
ALTER TABLE [security].[ProfileSettings]  WITH CHECK ADD  CONSTRAINT [FK_Profiles_To_ProfileSettings_On_Settings] FOREIGN KEY([ParentProfile])
REFERENCES [security].[Profiles] ([Id])
GO
ALTER TABLE [security].[ProfileSettings] CHECK CONSTRAINT [FK_Profiles_To_ProfileSettings_On_Settings]
GO
USE [master]
GO
ALTER DATABASE [MNHMH] SET  READ_WRITE 
GO
