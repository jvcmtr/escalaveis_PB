package edu.infnet.IssueService.repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import edu.infnet.IssueService.models.base.BaseEntity;

@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity, ID> extends JpaRepository<T, ID> {

    default <S extends T> S saveEntity(S entity, String currentUser) {
        LocalDateTime now = LocalDateTime.now();

        if (entity.getId() == null) {
            entity.setCreatedAt(now);
            entity.setCreatedBy(currentUser);
        } else {
            entity.setUpdatedAt(now);
            entity.setUpdatedBy(currentUser);
        }

        return save(entity);
    }

    default <S extends T> S saveEntity(S entity) {
        return saveEntity(entity, "Sistema");
    }

    default void delete(T entity, String deletedBy) {
        entity.setDeletedAt(java.time.LocalDateTime.now());
        entity.setDeletedBy(deletedBy);
        save(entity);
    }

    default void deleteById(ID id, String deletedBy) {
        findById(id).ifPresent(entity -> delete(entity, deletedBy));
    }

    default List<T> getAll() {
        return findAll().stream()
                .filter(entity -> entity.getDeletedAt() == null)
                .toList();
    }

    default Optional<T> get(ID id) {
        return findById(id).filter(entity -> entity.getDeletedAt() == null);
    }
}

