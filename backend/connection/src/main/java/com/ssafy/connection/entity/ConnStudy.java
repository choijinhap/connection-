package com.ssafy.connection.entity;

import com.ssafy.connection.dto.ConnStudyDto;
import com.ssafy.connection.dto.ProblemDto;
import com.ssafy.connection.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "ConnStudy")
public class ConnStudy {
    @Id
    @Column(name = "connStudy_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long connStudyId;

    /* 연관관계 매핑 */

    ////////////////////////////////////////

    public static ConnStudy of(ConnStudyDto connStudyDto) {
        ConnStudy connStudyEntity = ModelMapperUtils.getModelMapper().map(connStudyDto, ConnStudy.class);

        return connStudyEntity;
    }
}
