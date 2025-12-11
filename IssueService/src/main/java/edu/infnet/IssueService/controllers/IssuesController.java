package edu.infnet.IssueService.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.infnet.IssueService.models.Issues.EIssueStatus;
import edu.infnet.IssueService.models.Issues.Issue;
import edu.infnet.IssueService.repositories.IssueRepository;
import edu.infnet.IssueService.services.HistoryServiceIntegration;

@RestController
@RequestMapping("/api/issue")
@CrossOrigin(origins = "*")
public class IssuesController {

    @Autowired private IssueRepository issueRepository;
    
    @Autowired private HistoryServiceIntegration historyService;

    @GetMapping
    public List<Issue> getAllIssues() {
        return issueRepository.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long id) {
        return issueRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Issue createIssue(@RequestBody Issue issue, @RequestParam(required = true) String username) {
        issue.setStatus(EIssueStatus.OPEN);
                
        var e = issueRepository.saveEntity(issue, username);
        historyService.recordAction("CREATE", username, e);
        return e ;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Issue> updateIssue(@PathVariable Long id, @RequestBody Issue issueDetails, @RequestParam(required = true) String username) {
        return issueRepository.findById(id).map(issue -> {
            issue.setTitle(issueDetails.getTitle());
            issue.setDescription(issueDetails.getDescription());
            issue.setStatus(issueDetails.getStatus());

            Issue updatedIssue = issueRepository.saveEntity(issue, username);
            
            historyService.recordAction("UPDATE", username, updatedIssue);
            return ResponseEntity.ok(updatedIssue);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIssue(@PathVariable Long id, @RequestParam(required = true) String username) {
        return issueRepository.findById(id).map(issue -> {

            issueRepository.delete(issue, username);

            historyService.recordAction("DELETE", username, new Issue());
            return ResponseEntity.noContent().<Void>build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
