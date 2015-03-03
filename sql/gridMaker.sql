use MAPTEST;

IF OBJECT_ID('dbo.gridmaker_table', 'U') IS NOT NULL
          DROP TABLE dbo.gridmaker_table;
CREATE TABLE dbo.gridmaker_table( 
        gridmaker_table_id INT not null Identity(1,1),
		field_id integer default 0,
        table_name varchar(300) NOT NULL,
		grid_name varchar(max) NOT NULL,
		--grid_number_format varchar(max),
		grid_date_format varchar(max) default '%m-%d-%Y',
        CONSTRAINT gridmaker_table_pkey PRIMARY KEY (gridmaker_table_id)
);


ALTER  TABLE  gridmaker_table WITH CHECK 
   ADD CONSTRAINT uq_table_name UNIQUE (table_name);


IF OBJECT_ID('dbo.gridmaker_column', 'U') IS NOT NULL
          DROP TABLE dbo.gridmaker_column;
CREATE TABLE dbo.gridmaker_column( 
        gridmaker_column_id INT not null Identity(1,1),
		gridmaker_table_id INT NOT NULL,
        column_name varchar(max) NOT NULL,
		column_type varchar(max)  default 'varchar(max)',
		dhtmlx_grid_header varchar(max) NOT NULL,
		dhtmlx_grid_type varchar(max)  default 'txttxt',
		dhtmlx_grid_sorting varchar(max)  default 'str',
		dhtmlx_grid_width varchar(max)  default '*',
		dhtmlx_grid_align varchar(max)  default 'left',
		dhtmlx_grid_footer varchar(max)  default '',
        CONSTRAINT gridmaker_column_pkey PRIMARY KEY (gridmaker_column_id)
);


IF OBJECT_ID('dbo.relationship_manager_settings', 'U') IS NOT NULL
          DROP TABLE dbo.relationship_manager_settings;

CREATE TABLE dbo.relationship_manager_settings(
        relationship_manager_settings_id INT not null Identity(1,1),
        form_id INT default 0, -- 0 = none (support fast facts)
        field_id INT default 0, -- 0 = none (support fast facts)
        json_settings varchar(max) default '',
        CONSTRAINT relationship_manager_settings_pkey PRIMARY KEY (relationship_manager_settings_id)
);