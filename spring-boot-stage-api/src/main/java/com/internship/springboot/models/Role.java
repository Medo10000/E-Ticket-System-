package com.internship.springboot.models;

import com.internship.springboot.models.dto.RoleDto;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "roles")
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private ERole name;

  @JsonIgnore
  @ManyToMany(fetch = FetchType.LAZY)
  private List<User> users = new ArrayList<>();

  public void addUser(User user){
    users.add(user);
  }
  public void removeUser(User user){
    users.remove(user);
  }

  public Role() {

  }

  public Role(Integer id, ERole name) {
    this.id = id;
    this.name = name;
  }

  public static Role from(RoleDto roleDto){
    Role role = new Role();
    role.setName(roleDto.getName());
    return role;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public ERole getName() {
    return name;
  }

  public void setName(ERole name) {
    this.name = name;
  }
}