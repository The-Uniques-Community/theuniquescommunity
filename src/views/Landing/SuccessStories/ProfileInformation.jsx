import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Work as WorkIcon,
  School as SchoolIcon,
  EmojiEvents as AchievementIcon,
  Assignment as ProjectIcon,
  Code as CodeIcon,
  Group as LeadershipIcon
} from '@mui/icons-material';

const ProfileInformation = ({
  student,
  detailTabValue,
  onDetailTabChange,
  isMobile,
  StyledTabs,
  StyledTab,
  SectionHeading,
  DetailCard,
  isDarkMode
}) => (
  <Grid container spacing={4}>
    <Grid item xs={12}>
      <DetailCard elevation={3}>
        <SectionHeading variant="h5">Journey Overview</SectionHeading>
        <Typography variant="body1" paragraph sx={{ mt: 3, color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'text.primary' }}>
          {student.summary}
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card 
              variant="outlined" 
              sx={{ 
                bgcolor: isDarkMode ? '#1e1e1e' : '#fff',
                borderColor: isDarkMode ? '#2d2d2d' : '#e0e0e0',
                height: '100%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: isDarkMode ? '0 12px 20px rgba(0,0,0,0.4)' : '0 12px 20px rgba(0,0,0,0.06)',
                  borderColor: '#ca0019',
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WorkIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Current Role</Typography>
                </Box>
                <Typography variant="body1" sx={{ mt: 1, color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>
                  {student.role} at {student.company}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card 
              variant="outlined" 
              sx={{ 
                bgcolor: isDarkMode ? '#1e1e1e' : '#fff',
                borderColor: isDarkMode ? '#2d2d2d' : '#e0e0e0',
                height: '100%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: isDarkMode ? '0 12px 20px rgba(0,0,0,0.4)' : '0 12px 20px rgba(0,0,0,0.06)',
                  borderColor: '#ca0019',
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SchoolIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Education</Typography>
                </Box>
                <Typography variant="body1" sx={{ mt: 1, color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>
                  {student.education?.degree || student.batch}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card 
              variant="outlined" 
              sx={{ 
                bgcolor: isDarkMode ? '#1e1e1e' : '#fff',
                borderColor: isDarkMode ? '#2d2d2d' : '#e0e0e0',
                height: '100%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: isDarkMode ? '0 12px 20px rgba(0,0,0,0.4)' : '0 12px 20px rgba(0,0,0,0.06)',
                  borderColor: '#ca0019',
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AchievementIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Key Achievement</Typography>
                </Box>
                <Typography variant="body1" sx={{ mt: 1, color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>
                  {student.leadership?.achievements?.[0] || student.timeline.slice(-1)[0].achievements[0]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DetailCard>
    </Grid>

    <Grid item xs={12}>
      <DetailCard elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabs
            value={detailTabValue}
            onChange={onDetailTabChange}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons={isMobile ? 'auto' : false}
          >
            <StyledTab
              icon={<SchoolIcon />}
              iconPosition="start"
              label="Education"
            />
            <StyledTab
              icon={<WorkIcon />}
              iconPosition="start"
              label="Professional Experience"
            />
            <StyledTab
              icon={<ProjectIcon />}
              iconPosition="start"
              label="Notable Projects"
            />
          </StyledTabs>
        </Box>

        {detailTabValue === 0 && student.education && (
          <Box sx={{ pt: 3 }}>
            <Typography variant="h6">{student.education.institution}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {student.education.degree}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
              <span>{student.education.duration}</span>
              <span>{student.education.location}</span>
            </Typography>
            {student.education.details && (
              <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                {student.education.details}
              </Typography>
            )}
          </Box>
        )}

        {detailTabValue === 1 && (
          <Box sx={{ pt: 3 }}>
            {student.experience && student.experience.length > 0 ? (
              student.experience.map((exp, index) => (
                <Box key={index} sx={{ mb: index < student.experience.length - 1 ? 4 : 0 }}>
                  <Typography variant="h6">{exp.company}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">{exp.role}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'text.secondary' }}>
                    <span>{exp.duration}</span>
                    <span>{exp.location}</span>
                  </Typography>

                  {exp.responsibilities && (
                    <List dense sx={{ mt: 1 }}>
                      {exp.responsibilities.map((resp, idx) => (
                        <ListItem key={idx} sx={{ pl: 0 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <AchievementIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={resp} 
                            primaryTypographyProps={{
                              sx: { color: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'text.primary' }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}

                  {index < student.experience.length - 1 && <Divider sx={{ my: 2, borderColor: isDarkMode ? '#2d2d2d' : '#e0e0e0' }} />}
                </Box>
              ))
            ) : (
              <Typography color="text.secondary">No professional experience listed.</Typography>
            )}
          </Box>
        )}

        {detailTabValue === 2 && (
          <Box sx={{ pt: 3 }}>
            {student.projects && student.projects.length > 0 ? (
              <Grid container spacing={3}>
                {student.projects.map((project, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        bgcolor: isDarkMode ? '#1e1e1e' : '#fff',
                        borderColor: isDarkMode ? '#2d2d2d' : '#e0e0e0',
                        height: '100%',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: isDarkMode ? '0 12px 20px rgba(0,0,0,0.4)' : '0 12px 20px rgba(0,0,0,0.06)',
                          borderColor: '#ca0019',
                        }
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6">{project.name}</Typography>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                          {project.date} • {project.technologies}
                        </Typography>
                        <Typography variant="body2" paragraph sx={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'text.primary' }}>
                          {project.description}
                        </Typography>

                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Key Achievements:
                        </Typography>
                        <List dense>
                          {project.achievements.map((achievement, idx) => (
                            <ListItem key={idx} sx={{ pl: 0 }}>
                              <ListItemIcon sx={{ minWidth: 28 }}>
                                <AchievementIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText 
                                primary={achievement} 
                                primaryTypographyProps={{
                                  sx: { color: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'text.primary' }
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="text.secondary">No projects listed.</Typography>
            )}
          </Box>
        )}
      </DetailCard>
    </Grid>

    {student.skills && (
      <Grid item xs={12}>
        <DetailCard elevation={3}>
          <SectionHeading variant="h5">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CodeIcon sx={{ mr: 1 }} />
              Technical Skills
            </Box>
          </SectionHeading>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {student.skills.languages && (
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>Languages</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {student.skills.languages.map((lang, idx) => (
                    <Chip
                      key={idx}
                      label={lang}
                      sx={{
                        bgcolor: isDarkMode ? '#2d2d2d' : '#000',
                        color: '#fff',
                        borderColor: isDarkMode ? '#3d3d3d' : '#000',
                        fontWeight: 500
                      }}
                      size="small"
                    />
                  ))}
                </Box>
              </Grid>
            )}

            {student.skills.technologies && (
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>Technologies & Frameworks</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {student.skills.technologies.map((tech, idx) => (
                    <Chip
                      key={idx}
                      label={tech}
                      variant="outlined"
                      sx={{
                        color: isDarkMode ? '#ff5252' : '#ca0019',
                        borderColor: isDarkMode ? 'rgba(255, 82, 82, 0.4)' : '#ca0019',
                        bgcolor: isDarkMode ? 'rgba(255, 82, 82, 0.05)' : 'rgba(202, 0, 25, 0.03)',
                        fontWeight: 500
                      }}
                      size="small"
                    />
                  ))}
                </Box>
              </Grid>
            )}

            {student.skills.tools && (
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>Developer Tools</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {student.skills.tools.map((tool, idx) => (
                    <Chip
                      key={idx}
                      label={tool}
                      sx={{
                        bgcolor: isDarkMode ? 'rgba(202, 0, 25, 0.85)' : '#ca0019',
                        color: '#fff',
                        fontWeight: 500
                      }}
                      size="small"
                    />
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        </DetailCard>
      </Grid>
    )}

    {student.leadership && (
      <Grid item xs={12}>
        <DetailCard elevation={3}>
          <SectionHeading variant="h5">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LeadershipIcon sx={{ mr: 1 }} />
              Leadership & Extracurricular
            </Box>
          </SectionHeading>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">{student.leadership.organization}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{student.leadership.role}</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' }}>{student.leadership.duration}</Typography>

            <List dense sx={{ mt: 2 }}>
              {student.leadership.achievements.map((achievement, idx) => (
                <ListItem key={idx} sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <AchievementIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={achievement} 
                    primaryTypographyProps={{
                      sx: { color: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'text.primary' }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </DetailCard>
      </Grid>
    )}
  </Grid>
);

export default ProfileInformation;
