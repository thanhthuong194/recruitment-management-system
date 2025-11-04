
    create table admin (
        userid int not null,
        primary key (userid)
    );

    create table applications (
        applicationid int identity not null,
        apply_date date not null,
        candidateid int not null,
        positionid int not null,
        status varchar(20),
        primary key (applicationid)
    );

    create table candidates (
        candidateid int identity not null,
        cpa float(24) not null,
        date_of_birth date not null,
        sex varchar(10) not null,
        phone varchar(15) not null,
        department varchar(50) not null,
        email varchar(50) not null,
        full_name varchar(50) not null,
        position varchar(50) not null,
        address varchar(255) not null,
        cv_path varchar(255) not null,
        primary key (candidateid)
    );

    create table job_positions (
        planid int not null,
        positionid int identity not null,
        position varchar(50) not null,
        title varchar(50) not null,
        primary key (positionid)
    );

    create table job_postings (
        created_by int not null,
        created_date date not null,
        deadline date not null,
        planid int not null,
        postid int identity not null,
        status varchar(20),
        title varchar(100) not null,
        primary key (postid)
    );

    create table notifications (
        candidateid int not null,
        notifid int identity not null,
        senderid int not null,
        sent_date date not null,
        position varchar(50) not null,
        title varchar(50) not null,
        primary key (notifid)
    );

    create table personnel_manager (
        userid int not null,
        department varchar(100) not null,
        position varchar(100) not null,
        primary key (userid)
    );

    create table recruitment_plan (
        approv_date date not null,
        approved_by int not null,
        cpa float(24) not null,
        creat_date date not null,
        created_by int not null,
        planid int identity not null,
        quantity int not null,
        status varchar(10),
        title varchar(30) not null,
        position varchar(50) not null,
        school varchar(255) not null,
        primary key (planid)
    );

    create table recruitment_results (
        planid int not null,
        resultid int identity not null,
        final_decision varchar(20) not null,
        primary key (resultid)
    );

    create table rector (
        userid int not null,
        primary key (userid)
    );

    create table unit_managers (
        userid int not null,
        department varchar(100) not null,
        position varchar(100) not null,
        primary key (userid)
    );

    create table users (
        date_of_birth date not null,
        userid int identity not null,
        sex varchar(10) not null,
        phone_number varchar(15) not null,
        role varchar(20) not null,
        username varchar(30) not null,
        email varchar(50) not null,
        full_name varchar(50) not null,
        password varchar(60) not null,
        address varchar(255) not null,
        primary key (userid)
    );

    alter table candidates 
       add constraint UK5ilb7049i3j8efmvh4w7adqxk unique (phone);

    alter table candidates 
       add constraint UKnm2ss73jii2hdupmpphl6agry unique (email);

    alter table job_postings 
       add constraint UKbq4yqhcr3dxof2nt7jtorjwid unique (planid);

    alter table notifications 
       add constraint UKblo2of3aq8aed69y5hk04uk9j unique (candidateid);

    alter table recruitment_results 
       add constraint UKfymu00vf0i8boqqojs8v1qnqj unique (planid);

    alter table users 
       add constraint UK9q63snka3mdh91as4io72espi unique (phone_number);

    alter table users 
       add constraint UKr43af9ap4edm43mmtq01oddj6 unique (username);

    alter table users 
       add constraint UK6dotkott2kjsp8vw4d0m25fb7 unique (email);

    alter table admin 
       add constraint FKlqlv4ildki58b8o21rbqxlco6 
       foreign key (userid) 
       references users;

    alter table applications 
       add constraint FK6wvmb8h9yi3euwm20cqa54f8c 
       foreign key (candidateid) 
       references candidates;

    alter table applications 
       add constraint FKcduqwdxhagcwt46hkljdf1s6m 
       foreign key (positionid) 
       references job_positions;

    alter table job_positions 
       add constraint FKfver8hwtmi6yatc1wxlqxgsb6 
       foreign key (planid) 
       references recruitment_plan;

    alter table job_postings 
       add constraint FKhx2d68tginer7ywbeefu3r1mh 
       foreign key (created_by) 
       references personnel_manager;

    alter table job_postings 
       add constraint FKnljjsljqwfngdk8wde8ftmymd 
       foreign key (planid) 
       references recruitment_plan;

    alter table notifications 
       add constraint FKf19reky9t3huwf1g6fi18l1bj 
       foreign key (candidateid) 
       references candidates;

    alter table notifications 
       add constraint FK5m2n2b7j2popmn91kxvs4hq4f 
       foreign key (senderid) 
       references personnel_manager;

    alter table personnel_manager 
       add constraint FK45o2x0aokgf6o0qt2fq5nonf4 
       foreign key (userid) 
       references users;

    alter table recruitment_plan 
       add constraint FKgtryoi1lkrid56u9m1kbx8jl1 
       foreign key (approved_by) 
       references rector;

    alter table recruitment_plan 
       add constraint FKme3fyefmv0mco6uhyk6ekibde 
       foreign key (created_by) 
       references unit_managers;

    alter table recruitment_results 
       add constraint FK2itvesa82hvrml2hm1iqnla10 
       foreign key (planid) 
       references recruitment_plan;

    alter table rector 
       add constraint FKpx3293g43wnt63fnaw7u8662u 
       foreign key (userid) 
       references users;

    alter table unit_managers 
       add constraint FK70n45mqgrx4387bgecvqj1890 
       foreign key (userid) 
       references users;
